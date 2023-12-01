<template>
    <PomoCountdownSpinner
        :radius="200"
        :duration="from"
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
import { toMinuteFormat } from '@/secondary/utils/date-utils';
import PomoCountdownSpinner from '@/primary/components/molecules/PomoCountdownSpinner.vue';

defineProps<{
    from: number;
    timeLeft: number;
}>();
</script>
