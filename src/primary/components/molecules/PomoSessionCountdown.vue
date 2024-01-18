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
            class="absolute z-[100] text-gray-600 rounded-full top-0 left-0 right-0 bottom-0 transition-all duration-150 ease-in backdrop-blur-[3px] flex justify-center items-center gap-2"
            :class="{
                'opacity-100': showControls,
                'opacity-0 pointer-events-none': !showControls
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
            class="text-2xl md:text-3xl font-semibold text-primary-600 tabular-nums transition-all"
        >
            {{ toMinuteFormat(timeLeft) }}
        </span>
    </PomoCountdownSpinner>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { toMinuteFormat } from '@/secondary/utils/date-utils';
import PomoCountdownSpinner from '@/primary/components/molecules/PomoCountdownSpinner.vue';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';

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
