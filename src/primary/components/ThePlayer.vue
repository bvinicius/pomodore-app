<template>
    <div class="fixed bottom-0 left-0 px-4 py-4 w-full">
        <div
            :style="{ left: playerProgress }"
            class="text-primary-400 flex items-center justify-center gap-8 mb-2"
        >
            <ph-skip-back
                class="cursor-pointer"
                :size="32"
                @click="handleSkipBackClick"
            />
            <ph-pause
                v-if="playButton"
                class="cursor-pointer"
                :size="32"
                @click="handlePlayPauseClick"
            />
            <ph-play
                v-else
                class="cursor-pointer"
                :size="32"
                @click="handlePlayPauseClick"
            />
            <ph-skip-forward
                class="cursor-pointer"
                :size="32"
                @click="handleSkipForwardClick"
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
<script lang="ts">
export default {
    name: 'ThePlayer',
    props: {
        playerProgress: {
            type: String,
            default: '0%'
        },
        timeOfTheSong: {
            type: String
        },
        timeToEnd: {
            type: String
        },
        playButton: {
            type: Boolean,
            default: true
        }
    },
    emits: ['play-pause', 'skip-back', 'skip-forward'],
    methods: {
        handlePlayPauseClick() {
            this.$emit('play-pause');
        },
        handleSkipBackClick() {
            this.$emit('skip-back');
        },
        handleSkipForwardClick() {
            this.$emit('skip-forward');
        }
    }
};
</script>
