<template>
    <div class="flex flex-col justify-between">
        <div
            v-if="pomoStore.session.current"
            class="flex justify-center items-center"
        >
            <span class="text-2xl md:text-3xl font-semibold text-primary-400">
                {{
                    pomoStore.session.current === PomoSessionType.WORK
                        ? 'Work session'
                        : 'Break session'
                }}
            </span>
        </div>
        <PomoSessionCountdown
            v-if="pomoStore.session.timeLeft"
            class="mx-auto"
            :from="pomoStore.currentSessionLength * 60"
            :radius="200"
            :time-left="pomoStore.session.timeLeft"
        />
    </div>
</template>

<script setup lang="ts">
import { Ref, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PomoSessionType } from '@/domain/Pomodore';
import { RootPage } from '@/primary/infrastructure/router';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionCountdown from '@/primary/components/molecules/PomoSessionCountdown.vue';
import { PomoRunner } from '@/secondary/PomodoreRunner';
import { injectSafe } from '@/primary/infrastructure/dependency-injection';
import { POMO_RUNNER } from '@/primary/infrastructure/dependency-symbols';

const router = useRouter();
const pomoStore = usePomoStore();

const subscriptions = ref<(() => void)[]>([]);

const runner = injectSafe<Ref<PomoRunner>>(POMO_RUNNER);

const addListeners = () => {
    subscriptions.value.push();

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
    if (!runner) {
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
