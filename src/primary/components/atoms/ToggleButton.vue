<template>
    <div
        class="cursor-pointer flex justify-center items-center"
        :class="[checked ? 'bg-white' : 'bg-black']"
        @click="emit('select')"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    checked: boolean;
}>();

const emit = defineEmits<{
    (e: 'select'): void;
}>();
</script>
