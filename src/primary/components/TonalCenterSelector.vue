<template>
    <div class="flex flex-col gap-4">
        <div class="flex gap-4 ml-7">
            <CircleToggleButton
                v-for="key in sharpNotes"
                :key="key"
                :label="key"
                :class="{ 'ml-14': key === 'F#' }"
                :checked="notesStore.tonalCenter === key"
                @select="notesStore.tonalCenter = key"
            />
        </div>
        <div class="flex gap-4">
            <CircleToggleButton
                v-for="key in naturalNotes"
                :key="key"
                :label="key"
                :checked="notesStore.tonalCenter === key"
                @select="notesStore.tonalCenter = key"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { allKeys } from '@/secondary/utils/music-theory';
import { useNotesStore } from '../infrastructure/store/NotesStore';
import CircleToggleButton from './atoms/CircleToggleButton.vue';

const notesStore = useNotesStore();

const eventKeys = {
    a: 'C',
    w: 'C#',
    s: 'D',
    e: 'D#',
    d: 'E',
    f: 'F',
    t: 'F#',
    g: 'G',
    y: 'G#',
    h: 'A',
    u: 'A#',
    j: 'B'
};

const naturalNotes = allKeys.filter((key) => !key.includes('#'));
const sharpNotes = allKeys.filter((key) => key.includes('#'));

document.addEventListener('keypress', (event) => {
    const key = event.key;
    if (!(key in eventKeys)) return;

    notesStore.tonalCenter = eventKeys[key as keyof typeof eventKeys];
});
</script>
