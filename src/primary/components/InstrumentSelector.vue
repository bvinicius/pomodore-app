<template>
    <div class="flex flex-row lg:flex-col gap-4">
        <div class="flex flex-col gap-2">
            <span class="text-on-primary-400">keys</span>
            <ToggleButton
                class="rounded w-16 h-16"
                :checked="instrumentStore.keys"
                @select="instrumentStore.keys = true"
                @unselect="instrumentStore.keys = false"
            />
        </div>
        <div class="flex flex-col gap-2">
            <span class="text-on-primary-400">bass</span>
            <ToggleButton
                class="rounded w-16 h-16"
                :checked="instrumentStore.bass"
                @select="instrumentStore.bass = true"
                @unselect="instrumentStore.bass = false"
            />
        </div>
        <div class="flex flex-col gap-2">
            <span class="text-on-primary-400">synth</span>
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
    v: () => (instrumentStore.keys = !instrumentStore.keys),
    b: () => (instrumentStore.bass = !instrumentStore.bass),
    n: () => (instrumentStore.synth = !instrumentStore.synth)
};

const onKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

    if (!(key in eventKeys)) return;
    eventKeys[key as keyof typeof eventKeys]();
};

document.addEventListener('keydown', onKeyDown);
</script>
