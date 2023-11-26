<template>
    <div class="flex flex-col justify-center gap-8">
        <h1
            class="text-4xl sm:text-6xl md:text-8xl text-center font-semibold text-primary-400 select-none"
        >
            Pomodore
        </h1>

        <div class="flex flex-col gap-4">
            <p class="text-center text-xs sm:text-sm md:text-base">
                Please configure your pomodore as you wish.
            </p>
            <div
                class="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24"
            >
                <PomoSessionInput
                    v-model="pomoStore.settings.workSessionLength"
                    label="Work session"
                    hint="min"
                />
                <PomoSessionInput
                    v-model="pomoStore.settings.breakSessionLength"
                    label="Break session"
                    hint="min"
                />
            </div>
        </div>

        <div class="flex justify-center mt-24">
            <PomoButton @click="startSession"> START </PomoButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { PomoSettings } from '@/domain/Pomodore';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionInput from '@/primary/components/molecules/PomoSessionInput.vue';
import { RootPage } from '@/primary/infrastructure/router';
import PomoButton from '@/primary/components/atoms/PomoButton.vue';
import { PomoRunner } from '@/secondary/PomodoreRunner';

const pomoStore = usePomoStore();
const router = useRouter();

const runner = inject<Ref<PomoRunner>>('runner');

const pomodore = reactive<PomoSettings>({
    workSessionLength: pomoStore.workSession || 1,
    breakSessionLength: pomoStore.breakSession || 1,
    sessions: pomoStore.settings?.sessions || 1
});

const startSession = () => {
    if (!runner) {
        throw 'Runner injection failed!';
    }

    if (!runner.value) {
        runner.value = new PomoRunner(pomodore);
    }
    router.push({ name: RootPage.session });
};
</script>
