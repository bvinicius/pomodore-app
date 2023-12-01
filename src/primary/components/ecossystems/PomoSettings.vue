<template>
    <div class="flex flex-col gap-8 animate-fade">
        <div class="flex flex-col gap-6 md:gap-12">
            <p class="text-center text-xs sm:text-sm md:text-base">
                Please configure your pomodore as you wish.
            </p>
            <div
                class="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-20"
            >
                <PomoSessionInput
                    v-model="pomoStore.settings.workSessionLength"
                    label="Work session"
                    hint="min"
                />
                <PomoSessionInput
                    v-model="pomoStore.settings.breakSessionLength"
                    label="Break session"
                    hint="min"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionInput from '@/primary/components/molecules/PomoSessionInput.vue';

const pomoStore = usePomoStore();
</script>
