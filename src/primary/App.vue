<template>
    <div class="bg-primary-500 h-screen w-screen px-8 py-4 select-none">
        <StatsComponent
            v-if="isStatsOn"
            :data="stats"
        />

        <h1 class="text-4xl mt-8 font-bold text-on-primary-500 text-center">
            Sound Machine
        </h1>

        <div
            class="hidden md:flex flex-col lg:flex-row justify-evenly lg:justify-between px-24 py-12 h-5/6 max-w-[1200px] mx-auto"
        >
            <div
                class="flex flex-col gap-16 lg:gap-8 items-center justify-evenly"
            >
                <TonalCenterSelector />

                <div class="flex flex-col gap-2">
                    <DegreeSelector :scale="notesStore.scale" />
                    <ChordExtensionSelector />
                </div>
            </div>
            <div class="flex flex-col justify-evenly items-center">
                <InstrumentSelector />
            </div>
        </div>
        <CreditsComponent />
    </div>
</template>
<script setup lang="ts">
import { reactive, watch, watchEffect } from 'vue';
import { PolySynth, Synth, Transport, start } from 'tone';
import InstrumentSelector from '@/primary/components/InstrumentSelector.vue';
import { useInstrumentStore } from '@/primary/infrastructure/store/InstrumentStore';
import DegreeSelector from '@/primary/components/DegreeSelector.vue';
import { useNotesStore } from '@/primary/infrastructure/store/NotesStore';
import { ChordGenerator } from '@/domain/ChordGenerator';
import { makeChord } from '@/secondary/utils/music-utils';
import TonalCenterSelector from '@/primary/components/TonalCenterSelector.vue';
import { keysPreset, bassPreset, synthPreset } from '@/data/presets';
import StatsComponent from '@/primary/components/molecules/StatsComponent.vue';
import CreditsComponent from '@/primary/components/CreditsComponent.vue';
import ChordExtensionSelector from '@/primary/components/ChordExtensionSelector.vue';

const instrumentStore = useInstrumentStore();
const notesStore = useNotesStore();

const chordGenerator = new ChordGenerator();

const isStatsOn = false;
const stats = reactive<Record<string, unknown>>({
    bpm: Transport.bpm.value,
    time: 0
});

const keys = new PolySynth().toDestination();
const bass = new Synth().toDestination();
const synth = new PolySynth().toDestination();

keys.set(keysPreset);
bass.set(bassPreset);
synth.set(synthPreset);

start();

const trigger = () => {
    releaseAll();

    if (!notesStore.degree) return;

    const chordNotes = chordGenerator.getNotes(
        notesStore.tonalCenter,
        notesStore.degree,
        notesStore.scale,
        notesStore.intervals
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
    keys.set({ volume: instrumentStore.keys ? keysPreset.volume : -Infinity });
    bass.set({ volume: instrumentStore.bass ? bassPreset.volume : -Infinity });
    synth.set({
        volume: instrumentStore.synth ? synthPreset.volume : -Infinity
    });
});

watch(
    () => notesStore.degree,
    (val) => {
        val ? trigger() : releaseAll();
    }
);

watch(
    () => notesStore.tonalCenter,
    () => {
        trigger();
    }
);
</script>
