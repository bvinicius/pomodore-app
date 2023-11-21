<template>
    <section class="flex flex-col items-center justify-center space-y-8">
        <div
            class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
            @drag.prevent.stop=""
            @dragstart.prevent.stop=""
            @dragend.prevent.stop="is_dragover = false"
            @dragover.prevent.stop="is_dragover = true"
            @dragenter.prevent.stop="is_dragover = true"
            @dragleave.prevent.stop="is_dragover = false"
            @drop.prevent.stop="upload($event)"
        >
            <h1 class="text-primary-400 text-6xl font-bold">
                Drop the low pressure songs here...
            </h1>
        </div>
        <div
            v-if="songs.length > 0"
            class="mt-8"
        >
            <h2 class="text-2xl font-semibold mb-4">Uploaded Songs:</h2>
            <ul>
                <li
                    v-for="(song, index) in songs"
                    :key="index"
                    class="text-gray-600"
                >
                    {{ song.name }}
                    <button
                        class="text-red-500"
                        @click="playSong(song)"
                    >
                        Play Song
                    </button>
                </li>
            </ul>
        </div>
    </section>
</template>

<script lang="ts">
import firebase from '@/includes/firebase';
import { Howl } from 'howler';
export default {
    name: 'StoragePage',
    data() {
        return {
            is_dragover: false,
            songs: [],
            sound: null || '',
            isSongPlaying: false
        };
    },

    mounted() {
        const storageRef = firebase.storage().ref();
        storageRef.listAll().then((result) => {
            result.items.forEach((file) => {
                this.songs.push(file);
            });
        });
    },

    methods: {
        upload($event) {
            const files = $event.dataTransfer
                ? [...$event.dataTransfer.files]
                : [...$event.target.files];

            files.forEach((file) => {
                if (file.type !== 'audio/mpeg') {
                    return;
                }

                if (file) {
                    const storageRef = firebase.storage().ref();
                    const fileRef = storageRef.child(file.name);
                    fileRef.put(file).then(() => {
                        console.log('Uploaded a file');
                    });
                }
            });
        },
        playSong(song) {
            const storageRef = firebase.storage().ref();
            storageRef
                .child(song.name)
                .getDownloadURL()
                .then((url) => {
                    if (!this.sound || !this.sound.playing()) {
                        this.sound = new Howl({
                            src: [url],
                            html5: true
                        });
                        this.sound.play();
                    } else {
                        this.sound.pause();
                    }
                });
        }
    }
};
</script>
