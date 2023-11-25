<template>
    <PomoButton
        class="!rounded-full !text-on-container-300 !p-2"
        :class="{ 'rotate-180': down }"
    >
        <div class="flex justify-center items-center w-2 h-2">^</div>
    </PomoButton>
</template>

<script setup lang="ts">
import PomoButton from '@/primary/components/atoms/PomoButton.vue';

defineProps<{
    down?: boolean;
}>();
</script>
