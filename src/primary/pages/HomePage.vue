<template>
    <div class="animate-fade">
        <div class="flex flex-col justify-center gap-12 md:gap-12">
            <div class="flex flex-col">
                <span
                    class="text-4xl sm:text-8xl text-center font-bold select-none transition-all duration-500 cursor-pointer"
                    :class="{ 'sm:!text-4xl': !pomoStore.isSettingsView }"
                    @click="pomoStore.currentView = 'settings'"
                >
                    Pomodore
                </span>
                <span
                    v-if="pomoStore.isSettingsView"
                    class="font-semibold text-center animate-fade-fast"
                >
                    A tool to do more things spending less time.
                </span>
            </div>

            <PomoCard class="mx-auto">
                <PomoSettings
                    v-if="pomoStore.isSettingsView"
                    v-model:break-session-length="settings.breakSessionLength"
                    v-model:work-session-length="settings.workSessionLength"
                />
                <PomoSession v-else />
            </PomoCard>

            <div
                v-if="pomoStore.isSettingsView"
                class="flex justify-center"
            >
                <PomoButton
                    class="flex items-center gap-2 px-8"
                    @click="onButtonClick"
                >
                    <span>{{
                        pomoStore.session.started ? 'Continue' : 'Start'
                    }}</span>
                </PomoButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { PomoSessionType } from '@/domain/Pomodore';
import PomoButton from '@/primary/components/atoms/PomoButton.vue';
import PomoSession from '@/primary/components/ecossystems/PomoSession.vue';
import PomoSettings from '@/primary/components/ecossystems/PomoSettings.vue';
import PomoCard from '@/primary/components/molecules/PomoCard.vue';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';

const pomoStore = usePomoStore();
const { restartSesion } = usePomoRunner();

const settings = reactive({
    workSessionLength: pomoStore.workSession,
    breakSessionLength: pomoStore.breakSession
});

const onButtonClick = () => {
    const changedSettings =
        pomoStore.workSession !== settings.workSessionLength ||
        pomoStore.breakSession !== settings.breakSessionLength;

    if (changedSettings && pomoStore.session.started) {
        pomoStore.updateSettings(settings);
        pomoStore.session.current = PomoSessionType.WORK;
        restartSesion();
    }

    pomoStore.toggleView();
};
</script>
