<template>
    <h1 class="text-6xl text-center font-bold text-primary-400">
        Nasty Funk Pomodore
    </h1>

    <button
        v-if="isSessionOver"
        class="bg-primary-container-400 text-primary-500 font-bold rounded-md px-4 py-2"
        @click="runner?.startNextSession()"
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
    <button
        v-if="runner?.started"
        class="bg-primary-container-400 text-primary-500 font-bold rounded-md px-4 py-2"
        @click="runner?.isPaused ? runner?.resume() : runner?.pause()"
    >
        {{ runner?.isPaused ? 'Resume' : 'Pause' }}
    </button>

    <div
        v-if="runner && runner.started"
        class="flex flex-col gap-3 text-xl text-center text-primary-400"
    >
        <p>Current session: {{ currentSession }}</p>
        <p>
            {{ runner.isPaused ? 'paused' : 'running' }}
        </p>
        <p>Time left: {{ timeLeft }}</p>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { PomoSettings, PomoSessionType } from '@/domain/Pomodore';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { PomoRunner } from '@/secondary/PomodoreRunner';
import { toMinuteFormat } from '@/secondary/utils/date-utils';

const pomoStore = usePomoStore();

const pomodore = reactive<PomoSettings>({
    workSessionLength: pomoStore.workSession || 1,
    breakSessionLength: pomoStore.breakSession || 1,
    sessions: pomoStore.pomodore?.sessions || 1
});

const currentSession = ref<PomoSessionType>();
const timeLeft = ref<string>();
const isSessionOver = ref(false);

const runner = ref<PomoRunner>();

const start = () => {
    runner.value = new PomoRunner(pomodore);

    runner.value.onSessionStart((session) => {
        currentSession.value = session;
        isSessionOver.value = false;
    });

    runner.value.onTick((secondsLeft) => {
        timeLeft.value = toMinuteFormat(secondsLeft);
    });

    runner.value.onSessionEnd(() => {
        isSessionOver.value = true;
    });

    runner.value.startNextSession();
};
</script>
