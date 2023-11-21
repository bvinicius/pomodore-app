<template>
    <h1 class="text-6xl text-center font-bold text-primary-400">
        Nasty Funk Pomodore
    </h1>

    <p class="text-xl text-center text-primary-400">
        {{ currentSession }}
    </p>

    <button
        v-if="isSessionOver"
        class="bg-primary-container-400 text-primary-500 font-bold rounded-md px-4 py-2"
        @click="nextSession"
    >
        Next session
    </button>

    <div class="flex gap-3">
        <input
            v-model="pomodore.workSessionLength"
            type="number"
            placeholder="Work session"
        />
        <input
            v-model="pomodore.breakSessionLength"
            type="number"
            placeholder="Chill session"
        />
    </div>

    <button
        class="bg-primary-container-400 text-primary-500 font-bold rounded-md px-4 py-2"
        @click="start"
    >
        Start
    </button>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { PomoSettings, PomoSessionType } from '@/domain/Pomodore';
import { PomoRunner } from '@/secondary/PomodoreRunner';
import { toMinuteFormat } from '@/secondary/utils/date-utils';
import { usePomoStore } from '../infrastructure/store/pomoStore';

const pomoStore = usePomoStore();

const pomodore = reactive<PomoSettings>({
    workSessionLength: pomoStore.workSession || 1,
    breakSessionLength: pomoStore.breakSession || 1,
    sessions: pomoStore.pomodore?.sessions || 1
});

const currentSession = ref<PomoSessionType>();
const isSessionOver = ref(false);

const runner = ref<PomoRunner>();

const start = () => {
    runner.value = new PomoRunner(pomodore);

    runner.value.onSessionStart((session) => {
        console.log('session start', session);
        currentSession.value = session;
        isSessionOver.value = false;
    });

    runner.value.onTick((secondsLeft) => {
        console.log('tick', toMinuteFormat(secondsLeft));
    });

    runner.value.onSessionEnd((session) => {
        console.log('session end', session);
        isSessionOver.value = true;
    });

    runner.value.startNextSession();
};

const nextSession = () => {
    runner.value?.startNextSession();
};
</script>
