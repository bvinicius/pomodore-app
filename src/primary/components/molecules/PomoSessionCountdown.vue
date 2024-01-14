<template>
    <PomoCountdownSpinner
        :key="key"
        :radius="200"
        :duration="duration"
        :start-from="secondsPassed"
        :paused="paused"
    >
        <span
            class="text-2xl md:text-3xl font-semibold text-primary-600 tabular-nums transition-all"
        >
            {{ toMinuteFormat(timeLeft) }}
        </span>
    </PomoCountdownSpinner>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { toMinuteFormat } from '@/secondary/utils/date-utils';
import PomoCountdownSpinner from '@/primary/components/molecules/PomoCountdownSpinner.vue';

const props = defineProps<{
    duration: number;
    timeLeft: number;
    paused?: boolean;
}>();

const secondsPassed = ref(props.duration - props.timeLeft);
const key = ref(0);

watchEffect(() => {
    if (props.duration - props.timeLeft === 0) {
        secondsPassed.value = 0;
        key.value++;
    }
});
</script>
