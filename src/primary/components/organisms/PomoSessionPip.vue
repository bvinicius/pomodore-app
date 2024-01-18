<template>
    <div class="flex flex-col justify-between gap-8 py-8">
        <PomoSessionCountdown
            :key="pomoStore.session.current"
            class="mx-auto animate-fade"
            :duration="pomoStore.currentSessionLength * 60"
            :radius="60"
            :time-left="pomoStore.session.timeLeft"
            :paused="pomoStore.session.paused"
        />
    </div>
</template>

<script setup lang="ts">
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionCountdown from '@/primary/components/molecules/PomoSessionCountdown.vue';

const pomoStore = usePomoStore();
</script>
