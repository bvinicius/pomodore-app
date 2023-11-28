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
                    <button
                        class="text-red-500"
                        @click="() => playSong(song)"
                    >
                        Play Song
                    </button>
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
    <ThePlayer
        :play-button="isPlaying"
        :player-progress="playerProgress"
        :time-of-the-song="timeOfTheSong"
        :time-to-end="timeToEnd"
        @skip-back="previousTrack"
        @play-pause="togglePlay"
        @skip-forward="nextTrack"
    />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Howl } from 'howler';
import ThePlayer from '@/primary/components/ThePlayer.vue';
import { FileService } from '@/domain/FileService';
import { FILE_SERVICE } from '../infrastructure/dependency-symbols';
import { injectSafe } from '../infrastructure/dependency-injection';
import { FileInfo } from '@/domain/FileInfo';

const fileService = injectSafe<FileService>(FILE_SERVICE);

const is_dragover = ref(false);
const songs = ref<FileInfo[]>([]);
const currentlyPlayingSong = ref('');
const playerProgress = ref('0%');
const timeOfTheSong = ref('');
const timeToEnd = ref('');
const isPlaying = ref(false);
const currentSongIndex = ref(0);
const sound = ref<Howl>();

onMounted(() => {
    fileService.getFilesInformation().then((res) => {
        songs.value = res as never[];
    });

    setInterval(() => {
        progress();
    }, 1000);
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

const playSong = (song: FileInfo) => {
    currentSongIndex.value = songs.value.indexOf(song);
    currentlyPlayingSong.value = song.name;

    fileService.getFileURL(song.name).then((url) => {
        if (!sound.value || sound.value.playing()) {
            sound.value = new Howl({
                src: [url],
                html5: true
            });
            sound.value.play();
            isPlaying.value = true;
        } else {
            sound.value.pause();
            isPlaying.value = false;
        }
    });
};

const togglePlay = () => {
    if (sound.value) {
        if (sound.value.playing()) {
            sound.value.pause();
            isPlaying.value = false;
        } else {
            sound.value.play();
            isPlaying.value = true;
        }
    }
};

const previousTrack = async () => {
    if (currentSongIndex.value > 0) {
        sound.value?.pause();
        playSong(songs.value[currentSongIndex.value - 1]);
    } else {
        sound.value?.pause();
        playSong(songs.value[songs.value.length - 1]);
    }
};

const nextTrack = async () => {
    if (currentSongIndex.value < songs.value.length - 1) {
        sound.value?.pause();
        playSong(songs.value[currentSongIndex.value + 1]);
    } else {
        sound.value?.pause();
        playSong(songs.value[0]);
    }
};

const progress = () => {
    if (!sound.value) return;
    timeToEnd.value = `${Math.floor(sound.value.duration() / 60)}:${Math.floor(
        sound.value.duration() % 60
    )}`;
    timeOfTheSong.value = `${Math.floor(sound.value.seek() / 60)}:${Math.floor(
        sound.value.seek() % 60
    )
        .toString()
        .padStart(2, '0')}`;
    playerProgress.value = `${
        (sound.value.seek() / sound.value.duration()) * 100
    }%`;
};
</script>
