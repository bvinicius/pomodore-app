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
                    <PomoCard
                        class="flex flex-col gap-8 mx-auto transition-all"
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
                            class="flex items-center gap-2 mx-auto animate-fade-fast"
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
                        class="p-4 md:p-6 cursor-pointer"
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
import PomoSession from '@/primary/components/organisms/PomoSession.vue';
import PomoSettings from '@/primary/components/organisms/PomoSettings.vue';
import PomoCard from '@/primary/components/molecules/PomoCard.vue';
import DelayWrapper from '@/primary/components/molecules/DelayWrapper.vue';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import PomoSessionCompact from '@/primary/components/organisms/PomoSessionCompact.vue';
import { useMultiplayer } from '../infrastructure/composables/multiplayer';

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
