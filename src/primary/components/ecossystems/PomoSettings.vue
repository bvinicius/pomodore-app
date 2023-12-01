<template>
    <PomoCard class="mx-auto">
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
    </PomoCard>
    <div class="flex justify-center">
        <PomoButton
            class="flex items-center gap-2 px-8"
            @click="startSession"
        >
            <span>{{ pomoStore.session.started ? 'Continue' : 'Start' }}</span>
        </PomoButton>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionInput from '@/primary/components/molecules/PomoSessionInput.vue';
import PomoButton from '@/primary/components/atoms/PomoButton.vue';
import { HomeView } from '@/primary/infrastructure/router/homeViews';
import PomoCard from '@/primary/components/molecules/PomoCard.vue';

const pomoStore = usePomoStore();
const router = useRouter();

const startSession = () => {
    router.push({ name: HomeView.session });
};
</script>
