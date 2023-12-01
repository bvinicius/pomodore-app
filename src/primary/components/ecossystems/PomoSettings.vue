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
            <span>{{ runner.started ? 'Continue' : 'Start' }}</span>
        </PomoButton>
    </div>
</template>

<script setup lang="ts">
import { Ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { PomoSettings } from '@/domain/Pomodore';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionInput from '@/primary/components/molecules/PomoSessionInput.vue';
import PomoButton from '@/primary/components/atoms/PomoButton.vue';
import { injectSafe } from '@/primary/infrastructure/dependency-injection';
import { PomoRunner } from '@/secondary/PomodoreRunner';
import { POMO_RUNNER } from '@/primary/infrastructure/dependency-symbols';
import { HomeView } from '@/primary/infrastructure/router/homeViews';
import PomoCard from '../molecules/PomoCard.vue';

const pomoStore = usePomoStore();
const router = useRouter();

const runner = injectSafe<Ref<PomoRunner>>(POMO_RUNNER);

const pomodore = reactive<PomoSettings>({
    workSessionLength: pomoStore.workSession || 1,
    breakSessionLength: pomoStore.breakSession || 1,
    sessions: pomoStore.settings?.sessions || 1
});

const startSession = () => {
    if (!runner) {
        throw 'Runner injection failed!';
    }

    if (!runner.value) {
        runner.value = new PomoRunner(pomodore);
    }
    router.push({ name: HomeView.session });
};
</script>
