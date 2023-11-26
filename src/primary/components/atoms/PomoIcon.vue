<template>
    <span class="material-icons">{{ name }}</span>
</template>

<script setup lang="ts">
defineProps<{
    name: string;
}>();
</script>
