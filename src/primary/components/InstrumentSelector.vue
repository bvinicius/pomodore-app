<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-end gap-2">
            <ToggleButton
                class="rounded w-16 h-16"
                :checked="instrumentStore.keys"
                @select="instrumentStore.keys = true"
                @unselect="instrumentStore.keys = false"
            />
            <span>keys</span>
        </div>
        <div class="flex items-end gap-2">
            <ToggleButton
                class="rounded w-16 h-16"
                :checked="instrumentStore.bass"
                @select="instrumentStore.bass = true"
                @unselect="instrumentStore.bass = false"
            />
            <span>bass</span>
        </div>
        <div class="flex items-end gap-2">
            <ToggleButton
                class="rounded w-16 h-16"
                :checked="instrumentStore.synth"
                @select="instrumentStore.synth = true"
                @unselect="instrumentStore.synth = false"
            />
            <span>synth</span>
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
