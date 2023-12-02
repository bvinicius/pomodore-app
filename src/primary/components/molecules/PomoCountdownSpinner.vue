<template>
    <div
        class="flex relative justify-center items-center"
        :style="{ width: containerSizePx, height: containerSizePx }"
    >
        <slot></slot>
        <svg class="absolute w-full h-full top-0 right-0 z-50">
            <circle
                class="countdown__foreground-ring stroke-primary-600"
                :r="radius"
                cx="50%"
                cy="50%"
            ></circle>
        </svg>
        <svg class="absolute w-full h-full top-0 right-0 z-0">
            <circle
                class="countdown__background-ring stroke-primary-300"
                :r="radius"
                cx="50%"
                cy="50%"
            ></circle>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const CONTAINER_PADDING_RATIO = 0.1;

const props = withDefaults(
    defineProps<{
        duration?: number;
        startFrom?: number;
        radius?: number;
        paused?: boolean;
    }>(),
    {
        duration: 10,
        startFrom: 0,
        radius: 24
    }
);

const padding = computed(() =>
    Math.max(props.radius * CONTAINER_PADDING_RATIO, 1)
);

const circunferencePx = computed(() => Math.PI * props.radius * 2 + 'px');
const containerSizePx = computed(() => props.radius * 2 + padding.value + 'px');
const durationAnimation = computed(
    () =>
        `countdown ${props.duration - props.startFrom}s linear forwards` +
        (props.paused ? ' paused' : ' running')
);
const initialDashoffset = computed(() => {
    const percent = props.startFrom / props.duration;
    return `${Math.PI * props.radius * 2 * percent}px`;
});
</script>

<style>
.countdown__background-ring {
    stroke-dasharray: v-bind(circunferencePx);
    stroke-linecap: round;
    stroke-width: 4px;
    fill: none;
}

.countdown__foreground-ring {
    stroke-dasharray: v-bind(circunferencePx);
    stroke-linecap: round;
    stroke-width: 4px;
    fill: none;
    animation: v-bind(durationAnimation);
}

@keyframes countdown {
    from {
        stroke-dashoffset: v-bind(initialDashoffset);
    }
    to {
        stroke-dashoffset: v-bind(circunferencePx);
    }
}
</style>
