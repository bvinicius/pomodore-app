<template>
    <PomoButton
        class="!rounded-full border-on-container-500 !bg-transparent !p-2 !text-on-container-500"
        :class="{ 'rotate-180': down }"
    >
        <div class="flex h-4 w-4 items-center justify-center">
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
