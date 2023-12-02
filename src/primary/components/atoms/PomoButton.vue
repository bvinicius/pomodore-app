<template>
    <button
        class="bg-on-container-500 text-sm font-bold md:text-base rounded-lg px-4 py-2 border border-on-container-500 select-none hover:border-gray-400 text-on-container-400 active:opacity-80 transition-all"
        :class="{
            'bg-transparent text-on-container-500 hover:opacity-70 hover:text-on-container-400':
                outline
        }"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    outline?: boolean;
}>();
</script>
