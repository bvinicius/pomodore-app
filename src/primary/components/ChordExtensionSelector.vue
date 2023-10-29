<template>
    <div class="flex">
        <ToggleButton
            v-for="ext in CHORD_EXTENSIONS"
            :key="ext"
            :checked="notesStore.intervals.includes(toNumber(ext))"
            class="py-2 px-4 rounded-sm text-white"
            @click="notesStore.toggleExtension(toNumber(ext))"
        >
            {{ ext }}
        </ToggleButton>
    </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '../infrastructure/store/NotesStore';
import ToggleButton from './atoms/ToggleButton.vue';

const CHORD_EXTENSIONS = ['1st', '3rd', '5th', '7th', '9th'];

const notesStore = useNotesStore();

const toNumber = (extension: string) => Number(extension.slice(0, -2));
</script>
