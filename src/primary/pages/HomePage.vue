<template>
    <div class="animate-fade">
        <div class="flex flex-col justify-center gap-24">
            <div class="flex flex-col">
                <span
                    class="text-4xl sm:text-8xl text-center font-bold select-none"
                >
                    Pomodore
                </span>
                <span class="font-semibold text-center">
                    A tool to do more things spending less time.
                </span>
            </div>

            <router-view
                v-if="showRouter"
                class="animate-fade"
            >
            </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { POMO_RUNNER } from '@/primary/infrastructure/dependency-symbols';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { PomoRunner } from '@/secondary/PomodoreRunner';

const pomoStore = usePomoStore();
const showRouter = ref(false);

const runner = pomoStore.settings
    ? ref<PomoRunner>(new PomoRunner(pomoStore.settings))
    : ref<PomoRunner>();

provide(POMO_RUNNER, runner);

onMounted(() => {
    setTimeout(() => {
        showRouter.value = true;
    }, 500);
});
</script>
