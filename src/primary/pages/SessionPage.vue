<template>
    <div class="grid grid-cols-2 my-auto">
        <PomoSessionCountdown
            v-if="pomoStore.session.timeLeft"
            :from="pomoStore.currentSessionLength * 60"
            :radius="200"
            :time-left="pomoStore.session.timeLeft"
        />
        <div
            v-if="pomoStore.session.current"
            class="text-center"
        >
            {{
                pomoStore.session.current === PomoSessionType.WORK
                    ? 'Work session'
                    : 'Break session'
            }}
        </div>
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
import { PomoSessionType } from '@/domain/Pomodore';
import { RootPage } from '@/primary/infrastructure/router';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionCountdown from '@/primary/components/molecules/PomoSessionCountdown.vue';
import { type PomoRunner } from '@/secondary/PomodoreRunner';

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

    subscriptions.value.push(
        runner.value.onTick((secondsLeft) => {
            pomoStore.session.timeLeft = secondsLeft;
        })
    );

    subscriptions.value.push(
        runner.value.onSessionEnd(() => {
            pomoStore.session.isOver = true;
        })
    );

    if (!runner.value.started) {
        runner.value.startNextSession();
    }
};

const checkPomodoreRunner = () => {
    if (!runner?.value) {
        router.push({ name: RootPage.home });
    }
};

onBeforeMount(checkPomodoreRunner);

onMounted(addListeners);

onBeforeUnmount(() =>
    subscriptions.value.forEach((unsubscribe) => {
        console.log(unsubscribe);

        unsubscribe();
    })
);
</script>
