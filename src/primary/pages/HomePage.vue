<template>
    <div class="animate-fade">
        <div class="flex flex-col justify-center gap-6 md:gap-12">
            <div class="flex flex-col">
                <span
                    class="mx-auto cursor-pointer select-none text-center text-4xl font-bold transition-all duration-500 sm:text-8xl"
                    :class="{ 'sm:!text-4xl': !pomoStore.isSettingsView }"
                    @click="pomoStore.currentView = 'settings'"
                >
                    Pomodore
                </span>
                <span
                    v-if="pomoStore.isSettingsView"
                    class="hidden animate-fade-fast text-center font-semibold sm:block"
                >
                    A tool to do more things spending less time.
                </span>
            </div>

            <DelayWrapper
                v-if="pomoStore.isSettingsView"
                :duration="100"
            >
                <div class="mx-auto flex flex-col gap-8">
                    <PomoCard
                        class="mx-auto flex flex-col gap-8 transition-all"
                        :class="{ '!pb-6': showStartButton }"
                    >
                        <PomoSettings
                            :key="pomoStore.id"
                            v-model:break-session-length="
                                settings.breakSessionLength
                            "
                            v-model:work-session-length="
                                settings.workSessionLength
                            "
                        />

                        <PomoButton
                            v-if="showStartButton"
                            class="mx-auto flex animate-fade-fast items-center gap-2"
                            @click="onButtonClick"
                        >
                            <PomoIcon
                                :name="
                                    pomoStore.session.started
                                        ? 'restart_alt'
                                        : 'play_arrow'
                                "
                            />
                            <span>{{
                                pomoStore.session.started
                                    ? 'Apply and restart'
                                    : 'Start'
                            }}</span>
                        </PomoButton>
                    </PomoCard>

                    <PomoCard
                        v-if="pomoStore.session.started"
                        class="cursor-pointer p-4 md:p-6"
                        button
                        @click="pomoStore.toggleView()"
                    >
                        <PomoSessionCompact :key="pomoStore.session.id" />
                    </PomoCard>
                </div>
            </DelayWrapper>

            <DelayWrapper
                v-else
                :duration="100"
            >
                <PomoCard class="mx-auto animate-fade transition-all">
                    <PomoSession />
                </PomoCard>

                <div class="flex justify-center gap-4">
                    <PomoButton
                        class="flex animate-fade items-center justify-between gap-2"
                        @click="pomoStore.toggleView()"
                    >
                        <PomoIcon name="arrow_back" />
                        <span>Back</span>
                    </PomoButton>

                    <PomoButton
                        class="flex animate-fade items-center justify-between gap-2"
                        @click="share"
                    >
                        <PomoIcon name="share" />
                        <span>Share</span>
                    </PomoButton>
                </div>
            </DelayWrapper>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';

import { PomoSessionType } from '@/domain/Pomodore';

import PomoButton from '@/primary/components/atoms/PomoButton.vue';
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import DelayWrapper from '@/primary/components/molecules/DelayWrapper.vue';
import PomoCard from '@/primary/components/molecules/PomoCard.vue';
import PomoSession from '@/primary/components/organisms/PomoSession.vue';
import PomoSessionCompact from '@/primary/components/organisms/PomoSessionCompact.vue';
import PomoSettings from '@/primary/components/organisms/PomoSettings.vue';
import { useMultiplayer } from '@/primary/infrastructure/composables/multiplayer';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';

const pomoStore = usePomoStore();
const { restartSesion } = usePomoRunner();
const { createSession } = useMultiplayer();

const editMode = ref(false);

const settings = reactive({
    workSessionLength: pomoStore.workSession,
    breakSessionLength: pomoStore.breakSession
});

const showStartButton = computed(() => {
    return !pomoStore.session.started || editMode.value;
});

const onButtonClick = () => {
    const hasActiveSession = pomoStore.session.started;
    pomoStore.updateSettings(settings);
    pomoStore.session.current = PomoSessionType.WORK;
    restartSesion();
    editMode.value = false;

    if (!hasActiveSession) pomoStore.toggleView();
};

const share = () => {
    createSession();
    const url = `${window.location.origin}/${pomoStore.id}`;
    window.open(url, '_blank');
};

watch(
    () => settings,
    () => {
        editMode.value = true;
    },
    { deep: true }
);
</script>
