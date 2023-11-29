<template>
    <div class="fixed bottom-0 left-0 px-4 py-4 w-full">
        <div
            :style="{ left: playerProgress }"
            class="text-primary-400 flex items-center justify-center gap-8 mb-2"
        >
            <PomoIcon
                class="select-none cursor-pointer"
                name="skip_previous"
                @click="() => emit('skip-back')"
            />

            <PomoIcon
                class="select-none cursor-pointer"
                :name="playButton ? 'pause' : 'play_arrow'"
                @click="() => emit('play-pause')"
            />
            <PomoIcon
                class="select-none cursor-pointer"
                name="skip_next"
                @click="() => emit('skip-forward')"
            />
        </div>
        <div class="flex justify-between">
            <p class="text-gray-500">{{ timeOfTheSong }}</p>
            <p class="text-gray-500">{{ timeToEnd }}</p>
        </div>
        <div class="flex flex-nowrap gap-4 items-center">
            <div class="w-full h-2 rounded bg-gray-400 relative cursor-pointer">
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
