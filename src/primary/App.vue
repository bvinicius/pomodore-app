<template>
    <div
        class="w-screen h-screen bg-primary-container-500 px-12 py-8 md:px-24 md:py-12"
    >
        <div class="animate-fade">
            <router-view> </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { POMO_RUNNER } from '@/primary/infrastructure/dependency-symbols';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { PomoRunner } from '@/secondary/PomodoreRunner';

const pomoStore = usePomoStore();

const runner = pomoStore.settings
    ? ref<PomoRunner>(new PomoRunner(pomoStore.settings))
    : ref<PomoRunner>();

provide(POMO_RUNNER, runner);
</script>
