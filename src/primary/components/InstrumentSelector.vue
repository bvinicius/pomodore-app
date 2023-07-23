<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <span>keys</span>
            <ToggleButton
                class="rounded w-16 h-16"
                :checked="instrumentStore.keys"
                @select="instrumentStore.keys = true"
                @unselect="instrumentStore.keys = false"
            />
        </div>
        <div class="flex flex-col gap-2">
            <span>bass</span>
            <ToggleButton
                class="rounded w-16 h-16"
                :checked="instrumentStore.bass"
                @select="instrumentStore.bass = true"
                @unselect="instrumentStore.bass = false"
            />
        </div>
        <div class="flex flex-col gap-2">
            <span>synth</span>
            <ToggleButton
                class="rounded w-16 h-16"
                :checked="instrumentStore.synth"
                @select="instrumentStore.synth = true"
                @unselect="instrumentStore.synth = false"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useInstrumentStore } from '@/primary/infrastructure/store/InstrumentStore';
import ToggleButton from '@/primary/components/atoms/ToggleButton.vue';

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
