<template>
    <div class="bg-primary-500 h-screen w-screen px-8 py-4 select-none">
        <h1 class="text-4xl mt-8 font-bold text-on-primary-500 text-center">
            Sound Machine
        </h1>

        <div class="flex justify-between px-24 py-12 h-5/6">
            <div class="flex flex-col gap-8 items-center justify-evenly">
                <TonalCenterSelector />
                <DegreeSelector />
            </div>
            <div class="flex flex-col justify-evenly">
                <InstrumentSelector />
            </div>
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
import { makeChord } from '@/secondary/utils/chordMaker';
import TonalCenterSelector from './components/TonalCenterSelector.vue';

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
    const chordNotes = majorScale.getNotes(
        notesStore.tonalCenter,
        notesStore.degree
    );

    const keyChord = makeChord(chordNotes, 3);
    const bassChord = makeChord(chordNotes, 2);
    const padChord = keyChord;

    keys.triggerAttack(keyChord);
    bass.triggerAttack(bassChord[0]);
    synth.triggerAttack(padChord);
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
