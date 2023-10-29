<template>
    <div class="flex">
        <ToggleButton
            v-for="ext in extensions"
            :key="ext"
            :checked="notesStore.intervals.includes(ext)"
            class="py-2 px-4 rounded-sm text-white"
            @click="notesStore.toggleExtension(ext)"
        >
            {{ ext }}
        </ToggleButton>
    </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '../infrastructure/store/NotesStore';
import ToggleButton from './atoms/ToggleButton.vue';

const notesStore = useNotesStore();

const extensions = [1, 3, 5, 7, 9];
</script>
