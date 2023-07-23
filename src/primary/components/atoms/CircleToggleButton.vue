<template>
    <div
        class="rounded-full cursor-pointer w-10 h-10"
        :class="[checked ? 'bg-white' : 'bg-black']"
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
