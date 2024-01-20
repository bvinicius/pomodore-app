<template>
    <button
        class="flex items-center text-sm font-bold md:text-base rounded-lg px-4 py-2 border select-none active:opacity-80 transition-all"
        :class="{
            'bg-on-container-500 text-on-container-400 border-on-container-500 hover:border-gray-400 ':
                variant === 'filled',
            'bg-transparent border-on-container-500 text-on-container-500 hover:border-gray-777 hover:text-gray-777':
                variant === 'outline',
            'bg-transparent text-red-700 border-red-700 hover:border-red-600 hover:text-red-600':
                variant === 'error'
        }"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
type PomoButtonVariant = 'outline' | 'filled' | 'error';

withDefaults(
    defineProps<{
        variant?: PomoButtonVariant;
    }>(),
    {
        variant: 'outline'
    }
);
</script>
