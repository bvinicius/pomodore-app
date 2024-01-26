<template>
    <div
        class="rounded-xl bg-primary-container-300/20 p-6 shadow-md md:p-12"
        :class="{ 'cursor-pointer transition-all hover:opacity-70': button }"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    button?: boolean;
}>();
</script>
