<template>
    <div class="bg-primary-500 h-screen w-screen px-8 py-4">
        <h1 class="text-4xl mt-8 font-bold text-on-primary-500 text-center">
            Sound Machine
        </h1>

        <div class="flex justify-between">
            <div class="flex flex-col"><DegreeSelector /></div>
            <InstrumentSelector />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { PolySynth, Synth, start } from 'tone';
import InstrumentSelector from '@/primary/components/InstrumentSelector.vue';
import { useInstrumentStore } from '@/primary/infrastructure/store/InstrumentStore';
import DegreeSelector from '@/primary/components/DegreeSelector.vue';
import { useNotesStore } from '@/primary/infrastructure/store/NotesStore';

const instrumentStore = useInstrumentStore();
const notesStore = useNotesStore();

const keysNotes = ref<string[]>([]);
const bassNote = ref<string>('');
const synthNotes = ref<string[]>([]);

const keys = new PolySynth().toDestination();
const bass = new Synth().toDestination();
const synth = new PolySynth().toDestination();

keys.set({ oscillator: { type: 'sine' } });
bass.set({ oscillator: { type: 'triangle' } });
synth.set({
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 6 }
});

start();

const trigger = () => {
    releaseAll();
    switch (notesStore.degree) {
        case 1:
            keysNotes.value = ['C3', 'E3', 'G3', 'B3'];
            bassNote.value = 'C2';
            synthNotes.value = ['C3', 'E3', 'G3', 'B3'];
            break;
        case 2:
            keysNotes.value = ['D3', 'F3', 'A3', 'C4'];
            bassNote.value = 'D2';
            synthNotes.value = ['D3', 'F3', 'A3', 'C4'];
            break;
        case 3:
            keysNotes.value = ['E3', 'G3', 'B3', 'D4'];
            bassNote.value = 'E2';
            synthNotes.value = ['E3', 'G3', 'B3', 'D4'];
            break;
        case 4:
            keysNotes.value = ['F3', 'A3', 'C4', 'E4'];
            bassNote.value = 'F2';
            synthNotes.value = ['F3', 'A3', 'C4', 'E4'];
            break;
        case 5:
            keysNotes.value = ['G3', 'E3', 'D4', 'F4'];
            bassNote.value = 'G2';
            synthNotes.value = ['G3', 'E3', 'D4', 'F4'];
            break;
        case 6:
            keysNotes.value = ['A3', 'C4', 'E4', 'G4'];
            bassNote.value = 'A2';
            synthNotes.value = ['A3', 'C4', 'E4', 'G4'];
            break;
        case 7:
            keysNotes.value = ['B3', 'D4', 'F4', 'A4'];
            bassNote.value = 'B2';
            synthNotes.value = ['B3', 'D4', 'F4', 'A4'];
            break;
        case 8:
            keysNotes.value = ['C4', 'E4', 'G4', 'B4'];
            bassNote.value = 'C3';
            synthNotes.value = ['C4', 'E4', 'G4', 'B4'];
            break;
        default:
            return;
    }

    keys.triggerAttack(keysNotes.value);
    bass.triggerAttack(bassNote.value);
    synth.triggerAttack(synthNotes.value);
};

const releaseAll = () => {
    keys.releaseAll();
    bass.triggerRelease();
    synth.releaseAll();
};

watchEffect(() => {
    keys.set({ volume: instrumentStore.keys ? -10 : -Infinity });
    bass.set({ volume: instrumentStore.bass ? -10 : -Infinity });
    synth.set({ volume: instrumentStore.synth ? -10 : -Infinity });
});

watch(
    () => notesStore.degree,
    (val) => {
        val ? trigger() : releaseAll();
    }
);
</script>
