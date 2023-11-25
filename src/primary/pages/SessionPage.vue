<template>
    <button
        v-if="pomoStore.session?.isOver"
        class="bg-primary-container-400 text-primary-500 font-bold rounded-md px-4 py-2"
        @click="runner?.startNextSession()"
    >
        Next session
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
        <p>Current session: {{ pomoStore.session?.current }}</p>
        <p>
            {{ runner.isPaused ? 'paused' : 'running' }}
        </p>
        <p>Time left: {{ pomoStore.session?.timeLeft }}</p>
    </div>
</template>

<script setup lang="ts">
import {
    Ref,
    inject,
    onBeforeMount,
    onBeforeUnmount,
    onMounted,
    ref
} from 'vue';
import { useRouter } from 'vue-router';
import { type PomoRunner } from '@/secondary/PomodoreRunner';
import { toMinuteFormat } from '@/secondary/utils/date-utils';
import { RootPage } from '../infrastructure/router';
import { usePomoStore } from '../infrastructure/store/pomoStore';

const router = useRouter();
const pomoStore = usePomoStore();

const subscriptions = ref<(() => void)[]>([]);

const runner = inject<Ref<PomoRunner>>('runner');

const addListeners = () => {
    subscriptions.value.push();

    if (!runner?.value) {
        throw 'Runner not injected!';
    }

    subscriptions.value.push(
        runner.value.onSessionStart((session) => {
            pomoStore.session.current = session;
            pomoStore.session.isOver = false;
        })
    );

    runner.value.onTick((secondsLeft) => {
        pomoStore.session.timeLeft = toMinuteFormat(secondsLeft);
    });

    runner.value.onSessionEnd(() => {
        pomoStore.session.isOver = true;
    });

    runner.value.startNextSession();
};

const checkPomodoreRunner = () => {
    if (!runner?.value) {
        router.push({ name: RootPage.home });
    }
};

onBeforeMount(checkPomodoreRunner);

onMounted(addListeners);

onBeforeUnmount(() =>
    subscriptions.value.forEach((unsubscribe) => unsubscribe())
);
</script>
