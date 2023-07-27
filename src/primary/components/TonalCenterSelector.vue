<template>
    <div class="flex flex-col gap-4">
        <div class="flex gap-6 ml-9">
            <ToggleButton
                v-for="key in sharpNotes"
                :key="key"
                :label="key"
                :class="{ 'ml-18': key === 'F#' }"
                :checked="notesStore.tonalCenter === key"
                class="rounded-full w-12 h-12"
                exclusive
                @select="notesStore.tonalCenter = key"
            />
        </div>
        <div class="flex gap-6">
            <ToggleButton
                v-for="key in naturalNotes"
                :key="key"
                :label="key"
                :checked="notesStore.tonalCenter === key"
                class="rounded-full w-12 h-12"
                exclusive
                @select="notesStore.tonalCenter = key"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { allKeys } from '@/secondary/utils/music-theory';
import { useNotesStore } from '@/primary/infrastructure/store/NotesStore';
import ToggleButton from '@/primary/components/atoms/ToggleButton.vue';

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
    const key = event.key.toLowerCase();
    if (!(key in eventKeys)) return;

    notesStore.tonalCenter = eventKeys[key as keyof typeof eventKeys];
});
</script>
