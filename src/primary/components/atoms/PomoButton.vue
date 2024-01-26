<template>
    <button
        class="flex select-none items-center rounded-lg border px-4 py-2 text-sm font-bold transition-all active:opacity-80 md:text-base"
        :class="{
            'border-on-container-500 bg-on-container-500 text-on-container-400 hover:border-gray-400 ':
                variant === 'filled',
            'border-on-container-500 bg-transparent text-on-container-500 hover:border-gray-777 hover:text-gray-777':
                variant === 'outline',
            'border-red-700 bg-transparent text-red-700 hover:border-red-600 hover:text-red-600':
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
