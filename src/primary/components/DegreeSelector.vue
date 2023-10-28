<template>
    <div class="flex gap-2">
        <div
            v-for="i in eventKeys"
            :key="i"
            class="flex"
        >
            <ToggleButton
                class="w-16 h-18 rounded"
                :checked="notesStore.degree === i"
                @select="notesStore.degree = i"
                @unselect="notesStore.degree = undefined"
            >
                <div class="text-white font-bold text-4xl">
                    {{ romanNumerals[i - 1] }}
                </div>
            </ToggleButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '@/primary/infrastructure/store/NotesStore';
import ToggleButton from '@/primary/components/atoms/ToggleButton.vue';
import { ScaleType } from '@/domain/ScaleType';
import { isDegreeMinor } from '@/secondary/utils/music-utils';

const props = defineProps<{
    scale: ScaleType;
}>();

const notesStore = useNotesStore();

const eventKeys = [1, 2, 3, 4, 5, 6, 7];

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].map(
    (n, index) => (isDegreeMinor(index + 1, props.scale) ? n.toLowerCase() : n)
);

eventKeys.forEach((e) => {
    console.log(e, isDegreeMinor(e, props.scale));
});

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
