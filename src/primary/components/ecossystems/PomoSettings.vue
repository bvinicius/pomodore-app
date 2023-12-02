<template>
    <div class="flex flex-col gap-8 animate-fade">
        <div class="flex flex-col gap-6 md:gap-12">
            <p class="text-center text-xs sm:text-sm md:text-base">
                Please configure your pomodore as you wish.
            </p>
            <div
                class="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-20"
            >
                <PomoSessionInput
                    v-model="workModel"
                    label="Work session"
                    hint="min"
                />
                <PomoSessionInput
                    v-model="breakModel"
                    label="Break session"
                    hint="min"
                />
            </div>
            <span
                v-if="showWarning"
                class="text-center text-xs sm:text-sm md:text-base text-red-700 animate-fade-fast"
                >You have an active session.
                <b
                    class="underline cursor-pointer tabular-nums"
                    @click="pomoStore.toggleView()"
                >
                    See pomodore</b
                >
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PomoSessionInput from '@/primary/components/molecules/PomoSessionInput.vue';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';

const pomoStore = usePomoStore();

const props = defineProps<{
    workSessionLength: number;
    breakSessionLength: number;
}>();

const showWarning = computed(() => {
    return pomoStore.session.started;
});

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
