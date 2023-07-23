<template>
    <div
        class="rounded-full w-6 h-6 cursor-pointer"
        :class="checked ? 'bg-white' : 'bg-black'"
        @click="emit('select')"
    ></div>
</template>

<script setup lang="ts">
defineProps<{
    checked: boolean;
}>();

const emit = defineEmits<{
    (e: 'select'): void;
}>();
</script>
