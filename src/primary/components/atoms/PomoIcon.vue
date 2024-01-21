<template>
    <span
        class="material-icons"
        :class="{
            'cursor-pointer hover:opacity-70': button && !disabled,
            'pointer-events-none opacity-50': disabled
        }"
        >{{ name }}</span
    >
</template>

<script setup lang="ts">
defineProps<{
    name: string;
    button?: boolean;
    disabled?: boolean;
}>();
</script>
