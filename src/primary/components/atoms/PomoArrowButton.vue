<template>
    <PomoButton
        class="!rounded-full !text-on-container-500 !p-2 !bg-transparent border-on-container-500"
        :class="{ 'rotate-180': down }"
    >
        <div class="flex justify-center items-center w-4 h-4">
            <PomoIcon name="arrow_drop_up" />
        </div>
    </PomoButton>
</template>

<script setup lang="ts">
import PomoButton from '@/primary/components/atoms/PomoButton.vue';
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';

defineProps<{
    down?: boolean;
}>();
</script>
