<template>
    <div class="bg-primary-500 h-screen w-screen px-8 py-4">
        <h1 class="text-4xl mt-8 font-bold text-on-primary-500 text-center">
            Sound Machine
        </h1>
    </div>
</template>
<script setup lang="ts">
import { PolySynth, Synth, start } from 'tone';
import { ref } from 'vue';

const keys = new PolySynth().toDestination();
const bass = new Synth().toDestination();
const pad = new PolySynth().toDestination();

const keysNotes = ref<string[]>([]);
const bassNote = ref<string>('');
const padNotes = ref<string[]>([]);

keys.set({
    oscillator: { type: 'sine' },
    volume: -10
});
bass.set({ oscillator: { type: 'triangle' } });
pad.set({
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 6 }
});

const currentNote = ref<string | undefined>(undefined);

start();

document.addEventListener('keydown', (event) => {
    if (event.key === currentNote.value) return;

    releaseAll();
    switch (event.key) {
        case '1':
            keysNotes.value = ['C3', 'E3', 'G3', 'B3'];
            bassNote.value = 'C2';
            padNotes.value = ['C3', 'E3', 'G3', 'B3'];
            break;
        case '2':
            keysNotes.value = ['D3', 'F3', 'A3', 'C4'];
            bassNote.value = 'D2';
            padNotes.value = ['D3', 'F3', 'A3', 'C4'];
            break;
        case '3':
            keysNotes.value = ['E3', 'G3', 'B3', 'D4'];
            bassNote.value = 'E2';
            padNotes.value = ['E3', 'G3', 'B3', 'D4'];
            break;
        case '4':
            keysNotes.value = ['F3', 'A3', 'C4', 'E4'];
            bassNote.value = 'F2';
            padNotes.value = ['F3', 'A3', 'C4', 'E4'];
            break;
        case '5':
            keysNotes.value = ['G3', 'E3', 'D4', 'F4'];
            bassNote.value = 'G2';
            padNotes.value = ['G3', 'E3', 'D4', 'F4'];
            break;
        case '6':
            keysNotes.value = ['A3', 'C4', 'E4', 'G4'];
            bassNote.value = 'A2';
            padNotes.value = ['A3', 'C4', 'E4', 'G4'];
            break;
        case '7':
            keysNotes.value = ['B3', 'D4', 'F4', 'A4'];
            bassNote.value = 'B2';
            padNotes.value = ['B3', 'D4', 'F4', 'A4'];
            break;
        case '8':
            keysNotes.value = ['C4', 'E4', 'G4', 'B4'];
            bassNote.value = 'C3';
            padNotes.value = ['C4', 'E4', 'G4', 'B4'];
            break;
        default:
            return;
    }

    currentNote.value = event.key;
    keys.triggerAttack(keysNotes.value);
    bass.triggerAttack(bassNote.value);
    pad.triggerAttack(padNotes.value);
});

document.addEventListener('keyup', (event) => {
    if (event.key !== currentNote.value) return;
    releaseAll();
});

const releaseAll = () => {
    currentNote.value = undefined;
    keys.releaseAll();
    bass.triggerRelease();
    pad.releaseAll();
};
</script>
