<template>
    <div class="flex animate-fade flex-col gap-8">
        <div class="flex flex-col gap-6 md:gap-12">
            <p class="text-center text-xs sm:text-sm md:text-base">
                Please configure your pomodore as you wish.
            </p>
            <div
                class="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-20"
            >
                <PomoSessionInput
                    v-model="workModel"
                    label="Work session"
                    hint="min"
                    :min="0"
                />
                <PomoSessionInput
                    v-model="breakModel"
                    label="Break session"
                    hint="min"
                    :min="0"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import PomoSessionInput from '@/primary/components/molecules/PomoSessionInput.vue';

const props = defineProps<{
    workSessionLength: number;
    breakSessionLength: number;
}>();

const emit = defineEmits<{
    (e: 'update:breakSessionLength', value: number): void;
    (e: 'update:workSessionLength', value: number): void;
}>();

const workModel = computed({
    get: () => props.workSessionLength,
    set: (value) => emit('update:workSessionLength', value)
});

const breakModel = computed({
    get: () => props.breakSessionLength,
    set: (value) => emit('update:breakSessionLength', value)
});
</script>
