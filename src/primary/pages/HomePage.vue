<template>
    <h1 class="text-6xl text-center font-bold text-primary-400">
        Nasty Funk Pomodore
    </h1>

    <div class="flex gap-3">
        <input
            v-model="pomodore.workSessionLength"
            type="number"
            placeholder="Work session"
        />
        <input
            v-model="pomodore.chillSessionLength"
            type="number"
            placeholder="Chill session"
        />
        <input
            v-model="pomodore.sessions"
            type="number"
            placeholder="Sessions"
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
import { Pomodore } from '@/domain/Pomodore';
import { PomodoreRunner } from '@/secondary/PomodoreRunner';
import { formatTime } from '@/secondary/utils/date-utils';

const pomodore = reactive<Pomodore>({
    workSessionLength: 25,
    chillSessionLength: 5,
    sessions: 3
});

const runner = ref<PomodoreRunner>();

const start = () => {
    runner.value = new PomodoreRunner(pomodore);
    runner.value.start();

    setInterval(() => {
        runner.value && console.log(formatTime(runner.value.timeLeft));
    }, 1000);
};
</script>
