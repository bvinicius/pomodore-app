<template>
    <div
        :key="pomoStore.session.current"
        class="flex justify-between gap-6 animate-fade"
    >
        <div
            class="flex flex-col items-start transition-all"
            :class="{ 'opacity-50': pomoStore.session.paused }"
        >
            <div class="tabular-nums text-2xl font-bold">
                {{ toMinuteFormat(pomoStore.session.timeLeft) }}
            </div>
            <div
                v-if="pomoStore.session.current"
                class="flex justify-center items-center"
            >
                <span class="text-m">
                    {{ pomoStore.session.current.toString() }} session
                </span>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <PomoIcon
                button
                :name="isMuted ? 'volume_off' : 'volume_up'"
                :title="isMuted ? 'Alarm muted' : 'Mute alarm'"
                @click.stop="toggleAlarmVolume"
            ></PomoIcon>

            <PomoIcon
                button
                :name="pomoStore.session.paused ? 'play_arrow' : 'pause'"
                :title="pomoStore.session.paused ? 'Resume' : 'Pause'"
                @click.stop="
                    () => (pomoStore.session.paused ? resume() : pause())
                "
            ></PomoIcon>

            <PomoIcon
                button
                name="fast_forward"
                title="Start next session"
                @click.stop="startNextSession"
            ></PomoIcon>
        </div>

        <div class="hidden items-center gap-4 md:flex">
            <PomoIcon
                v-if="isMiniatureAvailable"
                button
                name="picture_in_picture_alt"
                title="Open picture in picture"
                @click.stop="toggleMiniature()"
            ></PomoIcon>

            <PomoIcon
                button
                class="text-red-700"
                name="delete_outline"
                title="End current session"
                @click.stop="clearSession"
            ></PomoIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import { useAlarm } from '@/primary/infrastructure/composables/alarm';
import { usePomoMiniature } from '@/primary/infrastructure/composables/pomoMiniature';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';

import { toMinuteFormat } from '@/secondary/utils/date-utils';

const { startNextSession, clearSession, pause, resume } = usePomoRunner();
const { toggleMiniature, isMiniatureAvailable } = usePomoMiniature();
const { isMuted, toggleAlarmVolume } = useAlarm();

const pomoStore = usePomoStore();
</script>
