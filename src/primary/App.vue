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
import { watch, watchEffect } from 'vue';
import { PolySynth, Synth, start } from 'tone';
import InstrumentSelector from '@/primary/components/InstrumentSelector.vue';
import { useInstrumentStore } from '@/primary/infrastructure/store/InstrumentStore';
import DegreeSelector from '@/primary/components/DegreeSelector.vue';
import { useNotesStore } from '@/primary/infrastructure/store/NotesStore';
import { MajorScale } from '@/domain/MajorScale';

const instrumentStore = useInstrumentStore();
const notesStore = useNotesStore();

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

    if (!notesStore.degree) return;

    const majorScale = new MajorScale();
    const chord = majorScale
        .getChord(notesStore.tonalCenter, notesStore.degree)
        .map((note) => note + '4');

    keys.triggerAttack(chord);
    bass.triggerAttack(chord[0]);
    synth.triggerAttack(chord);
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
