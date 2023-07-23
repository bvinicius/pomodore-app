<template>
    <div class="flex flex-col">
        <div class="flex">
            <input
                v-model="instrumentStore.keys"
                type="checkbox"
            />
            <span>keys</span>
        </div>
        <div class="flex">
            <input
                v-model="instrumentStore.bass"
                type="checkbox"
            />
            <span>bass</span>
        </div>
        <div class="flex">
            <input
                v-model="instrumentStore.synth"
                type="checkbox"
            />
            <span>synth</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useInstrumentStore } from '@/primary/infrastructure/store/InstrumentStore';

const instrumentStore = useInstrumentStore();

const eventKeys = {
    keys: 'v',
    bass: 'b',
    synth: 'n'
};

const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === eventKeys.keys) {
        instrumentStore.keys = !instrumentStore.keys;
    }
    if (event.key === eventKeys.bass) {
        instrumentStore.bass = !instrumentStore.bass;
    }
    if (event.key === eventKeys.synth) {
        instrumentStore.synth = !instrumentStore.synth;
    }
};

document.addEventListener('keydown', onKeyDown);
</script>
