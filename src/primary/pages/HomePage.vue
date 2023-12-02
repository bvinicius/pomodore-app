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

            <PomoCard
                v-if="pomoStore.isSettingsView"
                class="mx-auto transition-all"
            >
                <PomoSettings
                    v-model:break-session-length="settings.breakSessionLength"
                    v-model:work-session-length="settings.workSessionLength"
                />
            </PomoCard>
            <DelayWrapper
                v-else
                :amount="100"
            >
                <PomoCard class="mx-auto transition-all animate-fade">
                    <PomoSession />
                </PomoCard>
            </DelayWrapper>

            <div
                v-if="pomoStore.isSettingsView"
                class="flex justify-center animate-fade"
            >
                <div
                    v-if="pomoStore.session.started"
                    class="flex flex-col gap-6 text-center text-xs sm:text-sm md:text-base animate-fade-fast"
                >
                    <span
                        >You have an active session.
                        <b
                            class="underline cursor-pointer tabular-nums"
                            @click="pomoStore.toggleView()"
                        >
                            See Pomodore</b
                        >
                    </span>
                    <PomoButton
                        outline
                        class="border-red-700 hover:border-red-700 mx-auto"
                        @click="clearSession"
                    >
                        <span class="text-red-700"> Finish Pomodore </span>
                    </PomoButton>
                </div>
                <PomoButton
                    v-if="!pomoStore.session.started"
                    class="flex items-center gap-2 px-8"
                    @click="onButtonClick"
                >
                    <span>{{
                        pomoStore.session.started ? 'Restart' : 'Start'
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
import DelayWrapper from '@/primary/components/molecules/DelayWrapper.vue';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';

const pomoStore = usePomoStore();
const { restartSesion, clearSession } = usePomoRunner();

const settings = reactive({
    workSessionLength: pomoStore.workSession,
    breakSessionLength: pomoStore.breakSession
});

const onButtonClick = () => {
    pomoStore.updateSettings(settings);
    pomoStore.session.current = PomoSessionType.WORK;
    restartSesion();

    pomoStore.toggleView();
};
</script>
