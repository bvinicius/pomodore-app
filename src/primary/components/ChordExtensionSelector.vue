<template>
    <div class="flex">
        <ToggleButton
            v-for="ext in CHORD_EXTENSIONS"
            :key="ext"
            :checked="notesStore.intervals.includes(toNumber(ext))"
            class="py-2 px-4 rounded-sm text-white"
            @click="() => onToggleExtension(toNumber(ext))"
        >
            {{ ext }}
        </ToggleButton>
    </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '../infrastructure/store/NotesStore';
import ToggleButton from './atoms/ToggleButton.vue';

const MAX_SIMULTANEOUS_EXTENSIONS = 5;
const CHORD_EXTENSIONS = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th'
];

const notesStore = useNotesStore();

const onToggleExtension = (extension: number) => {
    if (notesStore.intervals.length >= MAX_SIMULTANEOUS_EXTENSIONS) {
        if (notesStore.intervals.includes(extension)) {
            notesStore.toggleExtension(extension);
        }
        return;
    }
    notesStore.toggleExtension(extension);
};

const toNumber = (extension: string) => Number(extension.slice(0, -2));
</script>
