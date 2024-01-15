<template>
    <slot v-if="showContent"></slot>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
    duration: number;
}>();

const showContent = ref(false);

onMounted(() => {
    setTimeout(() => {
        showContent.value = true;
    }, props.duration);
});
</script>
