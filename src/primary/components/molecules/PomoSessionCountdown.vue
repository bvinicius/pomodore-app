<template>
    <PomoCountdownSpinner
        :key="key"
        :radius="200"
        :duration="duration"
        :start-from="secondsPassed"
    >
        <span
            class="text-2xl md:text-4xl font-semibold text-primary-600 tabular-nums transition-all"
            :class="{ 'text-primary-300': timeLeft === 0 }"
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
