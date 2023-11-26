<template>
    <PomoCountdownSpinner
        :radius="200"
        :duration="from"
    >
        <span class="text-4xl font-semibold text-primary-400 tabular-nums">
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
