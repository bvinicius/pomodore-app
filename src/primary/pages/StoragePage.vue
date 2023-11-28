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
                Drop the songs here...
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
                    <button class="text-red-500">Play Song</button>
                </li>
            </ul>
        </div>
    </section>
    <h1
        v-if="currentlyPlayingSong"
        class="flex items-end text-2xl text-gray-400"
    >
        Now playing: {{ currentlyPlayingSong }}
    </h1>
    <!-- <ThePlayer
        :play-button="isPlaying"
        :player-progress="playerProgress"
        :time-of-the-song="timeOfTheSong"
        :time-to-end="timeToEnd"
        @skip-back="previousTrack"
        @play-pause="togglePlay"
        @skip-forward="nextTrack"
    /> -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { Howl } from 'howler';
// import firebase from '@/primary/infrastructure/firebase';
// import ThePlayer from '@/primary/components/ThePlayer.vue';
import { FileService } from '@/domain/FileService';
import { FILE_SERVICE } from '../infrastructure/dependency-symbols';
import { injectSafe } from '../infrastructure/dependency-injection';
import { FileInfo } from '@/domain/FileInfo';

const fileService = injectSafe<FileService>(FILE_SERVICE);

const is_dragover = ref(false);
const songs = ref<FileInfo[]>([]);
const currentlyPlayingSong = ref('');
// const playerProgress = ref('0%');
// const timeOfTheSong = ref('');
// const timeToEnd = ref('');
// const isPlaying = ref(false);

onMounted(() => {
    fileService.getAll().then((res) => {
        songs.value = res as never[];
    });

    // setInterval(() => {
    //     progress();
    // }, 1000);
});

const upload = (event: DragEvent) => {
    if (!event.dataTransfer) {
        throw new Error('No data transfer in drag event!');
    }

    const files = [...event.dataTransfer.files];

    files.forEach((file) => {
        fileService.save(file).then(() => {
            console.log('SAVED SONG', file.name);
        });
    });
};

// const playSong = (song) => {
//     this.currentSongIndex = this.songs.indexOf(song);
//     this.currentlyPlayingSong = song.name;

//     const storageRef = firebase.storage().ref();
//     storageRef
//         .child(song.name)
//         .getDownloadURL()
//         .then((url) => {
//             if (!this.sound || !this.sound.playing()) {
//                 this.sound = new Howl({
//                     src: [url],
//                     html5: true
//                 });
//                 this.sound.play();
//                 this.isPlaying = true;
//             } else {
//                 this.sound.pause();
//                 this.isPlaying = false;
//             }
//         });
// };

// const togglePlay = () => {
//     if (this.sound) {
//         if (this.sound.playing()) {
//             this.sound.pause();
//             this.isPlaying = false;
//         } else {
//             this.sound.play();
//             this.isPlaying = true;
//         }
//     }
// };

// const previousTrack = async () => {
//     if (this.currentSongIndex > 0) {
//         this.sound.pause();
//         this.playSong(this.songs[this.currentSongIndex - 1]);
//     } else {
//         this.sound.pause();
//         this.playSong(this.songs[this.songs.length - 1]);
//     }
// };

// const nextTrack = async () => {
//     if (this.currentSongIndex < this.songs.length - 1) {
//         this.sound.pause();
//         this.playSong(this.songs[this.currentSongIndex + 1]);
//     } else {
//         this.sound.pause();
//         this.playSong(this.songs[0]);
//     }
// };

// const progress = () => {
//     this.timeToEnd = `${Math.floor(this.sound.duration() / 60)}:${Math.floor(
//         this.sound.duration() % 60
//     )}`;
//     this.timeOfTheSong = `${Math.floor(this.sound.seek() / 60)}:${Math.floor(
//         this.sound.seek() % 60
//     )
//         .toString()
//         .padStart(2, '0')}`;
//     this.playerProgress = `${
//         (this.sound.seek() / this.sound.duration()) * 100
//     }%`;
// };
</script>
