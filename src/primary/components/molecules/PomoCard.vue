<template>
    <div
        class="p-6 md:p-12 bg-primary-container-300/20 shadow-md rounded-xl"
        :class="{ 'cursor-pointer hover:opacity-70 transition-all': button }"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    button?: boolean;
}>();
</script>
