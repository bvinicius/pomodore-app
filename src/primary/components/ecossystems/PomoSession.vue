<template>
    <PomoCard class="mx-auto">
        <div class="flex flex-col justify-between">
            <div
                v-if="pomoStore.session.current"
                class="flex justify-center items-center"
            >
                <span
                    class="text-2xl md:text-3xl font-semibold text-on-container-500"
                >
                    {{
                        pomoStore.session.current === PomoSessionType.WORK
                            ? 'Work session'
                            : 'Break session'
                    }}
                </span>
            </div>
            <PomoSessionCountdown
                class="mx-auto"
                :from="pomoStore.currentSessionLength * 60"
                :radius="150"
                :time-left="pomoStore.session.timeLeft || 0"
            />
        </div>
        <div
            class="flex items-center justify-center mt-6 cursor-pointer text-gray-777"
            @click="runner.startNextSession"
        >
            <PomoIcon name="fast_forward"></PomoIcon>
            <span class="font-semibold"
                >Skip to
                {{
                    pomoStore.session.current === PomoSessionType.BREAK
                        ? 'work session'
                        : 'break session'
                }}</span
            >
        </div>
    </PomoCard>
</template>

<script setup lang="ts">
import { Ref, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PomoSessionType } from '@/domain/Pomodore';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionCountdown from '@/primary/components/molecules/PomoSessionCountdown.vue';
import { PomoRunner } from '@/secondary/PomodoreRunner';
import { injectSafe } from '@/primary/infrastructure/dependency-injection';
import { POMO_RUNNER } from '@/primary/infrastructure/dependency-symbols';
import { HomeView } from '@/primary/infrastructure/router/homeViews';
import PomoCard from '../molecules/PomoCard.vue';
import PomoIcon from '../atoms/PomoIcon.vue';

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
        router.push({ name: HomeView.settings });
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
