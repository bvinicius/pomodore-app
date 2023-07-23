<template>
    <div class="flex gap-2">
        <div
            v-for="key in allKeys"
            :key="key"
            class="flex"
        >
            <input
                type="checkbox"
                :checked="notesStore.tonalCenter === key"
                @change="notesStore.tonalCenter = key"
            />
            <span>{{ key }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { allKeys } from '@/secondary/utils/music-theory';
import { useNotesStore } from '../infrastructure/store/NotesStore';

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

document.addEventListener('keypress', (event) => {
    const key = event.key;
    if (!(key in eventKeys)) return;

    notesStore.tonalCenter = eventKeys[key as keyof typeof eventKeys];
});
</script>
