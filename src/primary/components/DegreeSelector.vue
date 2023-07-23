<template>
    <div class="flex gap-2">
        <div
            v-for="i in eventKeys"
            :key="i"
            class="flex"
        >
            <input
                type="checkbox"
                :checked="notesStore.degree === i"
                @change="notesStore.degree = i"
            />
            {{ i }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '@/primary/infrastructure/store/NotesStore';

const notesStore = useNotesStore();

const eventKeys = [1, 2, 3, 4, 5, 6, 7];

document.addEventListener('keydown', (event) => {
    const nKey = Number(event.key);

    if (
        !eventKeys.includes(nKey) ||
        nKey === notesStore.degree ||
        event.repeat
    ) {
        return;
    }

    notesStore.degree = nKey;
});

document.addEventListener('keyup', (event) => {
    const nKey = Number(event.key);

    if (nKey !== notesStore.degree) return;
    notesStore.degree = undefined;
});
</script>
