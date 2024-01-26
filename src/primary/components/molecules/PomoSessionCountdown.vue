<template>
    <PomoCountdownSpinner
        :key="key"
        :radius="200"
        :duration="duration"
        :start-from="secondsPassed"
        :paused="paused"
        class="relative"
        @mouseenter="hoveringCountdown = true"
        @mouseleave="hoveringCountdown = false"
    >
        <div
            class="absolute bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center gap-2 rounded-full text-gray-600 backdrop-blur-[3px] transition-all duration-150 ease-in"
            :class="{
                'opacity-100': showControls,
                'pointer-events-none opacity-0': !showControls
            }"
        >
            <PomoIcon
                button
                :name="pomoStore.session.paused ? 'play_arrow' : 'pause'"
                :title="pomoStore.session.paused ? 'Resume' : 'Pause'"
                @click="() => (pomoStore.session.paused ? resume() : pause())"
            ></PomoIcon>
            <PomoIcon
                button
                name="fast_forward"
                title="Start next session"
                @click="startNextSession"
            ></PomoIcon>
        </div>
        <span
            class="text-2xl font-semibold tabular-nums text-primary-600 transition-all md:text-3xl"
        >
            {{ toMinuteFormat(timeLeft) }}
        </span>
    </PomoCountdownSpinner>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import PomoCountdownSpinner from '@/primary/components/molecules/PomoCountdownSpinner.vue';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';

import { toMinuteFormat } from '@/secondary/utils/date-utils';

const props = defineProps<{
    duration: number;
    timeLeft: number;
    paused?: boolean;
    noControls?: boolean;
}>();

const pomoStore = usePomoStore();
const { pause, resume, startNextSession } = usePomoRunner();

const secondsPassed = ref(props.duration - props.timeLeft);
const key = ref(0);
const hoveringCountdown = ref(false);

const showControls = computed(() => {
    if (props.noControls) return false;
    return hoveringCountdown.value || pomoStore.session.paused;
});

watchEffect(() => {
    if (props.duration - props.timeLeft === 0) {
        secondsPassed.value = 0;
        key.value++;
    }
});
</script>
