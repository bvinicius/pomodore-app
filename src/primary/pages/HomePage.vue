<template>
    <div class="animate-fade">
        <div class="flex flex-col justify-center gap-6 md:gap-12">
            <div class="flex flex-col">
                <span
                    class="text-4xl sm:text-8xl text-center font-bold select-none transition-all duration-500 cursor-pointer mx-auto"
                    :class="{ 'sm:!text-4xl': !pomoStore.isSettingsView }"
                    @click="pomoStore.currentView = 'settings'"
                >
                    Pomodore
                </span>
                <span
                    v-if="pomoStore.isSettingsView"
                    class="hidden sm:block font-semibold text-center animate-fade-fast"
                >
                    A tool to do more things spending less time.
                </span>
            </div>

            <DelayWrapper
                v-if="pomoStore.isSettingsView"
                :duration="100"
            >
                <div class="flex flex-col mx-auto gap-8">
                    <PomoCard class="mx-auto transition-all">
                        <PomoSettings
                            v-model:break-session-length="
                                settings.breakSessionLength
                            "
                            v-model:work-session-length="
                                settings.workSessionLength
                            "
                        />
                    </PomoCard>

                    <PomoCard
                        v-if="pomoStore.session.started"
                        class="p-4 md:p-6 cursor-pointer"
                        button
                        @click="pomoStore.toggleView()"
                    >
                        <PomoSessionCompact />
                    </PomoCard>

                    <PomoButton
                        v-else
                        class="flex items-center gap-2 mx-auto animate-fade-fast"
                        @click="onButtonClick"
                    >
                        <PomoIcon name="play_arrow" />
                        <span>Start</span>
                    </PomoButton>
                </div>
            </DelayWrapper>

            <DelayWrapper
                v-else
                :duration="100"
            >
                <PomoCard class="mx-auto transition-all animate-fade">
                    <PomoSession />
                </PomoCard>

                <div class="flex justify-center gap-4">
                    <PomoButton
                        class="flex items-center justify-between gap-2 animate-fade"
                        @click="pomoStore.toggleView()"
                    >
                        <PomoIcon name="arrow_back" />
                        <span>Back</span>
                    </PomoButton>

                    <PomoButton
                        class="flex items-center justify-between gap-2 animate-fade"
                        variant="error"
                        @click="onDeleteClick"
                    >
                        <PomoIcon name="delete_outline" />
                        <span>Finish</span>
                    </PomoButton>
                </div>
            </DelayWrapper>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { PomoSessionType } from '@/domain/Pomodore';
import PomoButton from '@/primary/components/atoms/PomoButton.vue';
import PomoSession from '@/primary/components/organisms/PomoSession.vue';
import PomoSettings from '@/primary/components/organisms/PomoSettings.vue';
import PomoCard from '@/primary/components/molecules/PomoCard.vue';
import DelayWrapper from '@/primary/components/molecules/DelayWrapper.vue';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import PomoSessionCompact from '@/primary/components/organisms/PomoSessionCompact.vue';

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

const onDeleteClick = () => {
    clearSession();
    pomoStore.toggleView();
};
</script>
