<template>
    <span
        class="material-icons"
        :class="{ 'cursor-pointer hover:opacity-70': button }"
        >{{ name }}</span
    >
</template>

<script setup lang="ts">
defineProps<{
    name: string;
    button?: boolean;
}>();
</script>
