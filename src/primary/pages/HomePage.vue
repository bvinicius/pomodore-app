<template>
    <h1 class="text-6xl text-center font-semibold text-primary-400">
        Nasty Funk Pomodore
    </h1>

    <div class="flex justify-center gap-12 py-12">
        <PomoSessionInput
            v-model="pomoStore.settings.workSessionLength"
            hint="min"
        />
        <PomoSessionInput
            v-model="pomoStore.settings.breakSessionLength"
            hint="min"
        />
    </div>

    <button
        class="bg-primary-container-400 text-primary-500 font-bold rounded-md px-4 py-2"
        @click="startSession"
    >
        Start
    </button>
</template>

<script setup lang="ts">
import { Ref, inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { PomoSettings } from '@/domain/Pomodore';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { RootPage } from '@/primary/infrastructure/router';
import { PomoRunner } from '@/secondary/PomodoreRunner';
import PomoSessionInput from '../components/molecules/PomoSessionInput.vue';

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

    runner.value = new PomoRunner(pomodore);
    router.push({ name: RootPage.session });
};
</script>
