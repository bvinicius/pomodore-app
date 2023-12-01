<template>
    <div class="animate-fade">
        <div class="flex flex-col justify-center gap-12 md:gap-12">
            <div class="flex flex-col">
                <span
                    class="text-4xl sm:text-8xl text-center font-bold select-none transition-all duration-500"
                    :class="{ 'sm:text-4xl': isSessionView }"
                >
                    Pomodore
                </span>
                <span
                    v-if="isSettingsView"
                    class="font-semibold text-center animate-fade-fast"
                >
                    A tool to do more things spending less time.
                </span>
            </div>

            <router-view class="animate-fade-fast"> </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { POMO_RUNNER } from '@/primary/infrastructure/dependency-symbols';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { PomoRunner } from '@/secondary/PomodoreRunner';
import { useViewInfo } from '../infrastructure/composables/useViewInfo';

const { isSettingsView, isSessionView } = useViewInfo();

const pomoStore = usePomoStore();

const runner = pomoStore.settings
    ? ref<PomoRunner>(new PomoRunner(pomoStore.settings))
    : ref<PomoRunner>();

provide(POMO_RUNNER, runner);
</script>
