<template>
    <slot v-if="showContent"></slot>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
    amount: number;
}>();

const showContent = ref(false);

onMounted(() => {
    setTimeout(() => {
        showContent.value = true;
    }, props.amount);
});
</script>
