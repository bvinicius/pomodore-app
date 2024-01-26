<template>
    <div class="fixed bottom-0 left-0 w-full px-4 py-4">
        <div
            :style="{ left: playerProgress }"
            class="mb-2 flex items-center justify-center gap-8 text-primary-400"
        >
            <PomoIcon
                class="cursor-pointer select-none"
                name="skip_previous"
                @click="() => emit('skip-back')"
            />

            <PomoIcon
                class="cursor-pointer select-none"
                :name="playButton ? 'pause' : 'play_arrow'"
                @click="() => emit('play-pause')"
            />
            <PomoIcon
                class="cursor-pointer select-none"
                name="skip_next"
                @click="() => emit('skip-forward')"
            />
        </div>
        <div class="flex justify-between">
            <p class="text-gray-500">{{ timeOfTheSong }}</p>
            <p class="text-gray-500">{{ timeToEnd }}</p>
        </div>
        <div class="flex flex-nowrap items-center gap-4">
            <div class="relative h-2 w-full cursor-pointer rounded bg-gray-400">
                <span
                    class="block h-2 rounded bg-primary-500"
                    :style="{ width: playerProgress }"
                ></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';

withDefaults(
    defineProps<{
        playerProgress: string;
        timeOfTheSong: string;
        timeToEnd: string;
        playButton: boolean;
    }>(),
    {
        playerProgress: '0%',
        playButton: true
    }
);

const emit = defineEmits<{
    (e: 'play-pause'): void;
    (e: 'skip-back'): void;
    (e: 'skip-forward'): void;
}>();
</script>
