<template>
    <div
        class="flex flex-col justify-between gap-8"
        :class="{ 'py-8': pip }"
    >
        <div
            v-if="pomoStore.session.current && !pip"
            class="flex justify-center items-center"
        >
            <span
                class="text-2xl md:text-2xl font-semibold text-on-container-500 animate-fade"
            >
                {{
                    pomoStore.session.isOver
                        ? `Time's up!`
                        : `${pomoStore.session.current.toString()} session`
                }}
            </span>
        </div>
        <PomoSessionCountdown
            :key="pomoStore.session.current"
            class="mx-auto animate-fade"
            :duration="pomoStore.currentSessionLength * 60"
            :radius="circleRadius"
            :time-left="pomoStore.session.timeLeft"
            :paused="pomoStore.session.paused"
            no-controls
        />
        <div class="flex justify-around gap-4 text-gray-777">
            <PomoIcon
                button
                name="restart_alt"
                title="Restart session"
                @click="restartSesion"
            ></PomoIcon>

            <div class="flex gap-2">
                <PomoIcon
                    button
                    :name="isMuted ? 'volume_off' : 'volume_up'"
                    :title="isMuted ? 'Alarm muted' : 'Mute alarm'"
                    @click.stop="toggleAlarmVolume"
                ></PomoIcon>

                <PomoIcon
                    button
                    :disabled="pomoStore.session.isOver"
                    :name="pomoStore.session.paused ? 'play_arrow' : 'pause'"
                    :title="pomoStore.session.paused ? 'Resume' : 'Pause'"
                    @click="
                        () => (pomoStore.session.paused ? resume() : pause())
                    "
                ></PomoIcon>
                <PomoIcon
                    button
                    name="fast_forward"
                    title="Start next session"
                    @click="startNextSession"
                ></PomoIcon>
            </div>

            <div class="flex gap-2">
                <PomoIcon
                    v-if="isMiniatureAvailable"
                    button
                    name="picture_in_picture_alt"
                    title="Open picture in picture"
                    @click.stop="onMiniatureClick"
                ></PomoIcon>

                <PomoIcon
                    button
                    class="text-red-700"
                    name="delete_outline"
                    title="End current session"
                    @click.stop="onDeleteClick"
                ></PomoIcon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import PomoSessionCountdown from '@/primary/components/molecules/PomoSessionCountdown.vue';
import { useAlarm } from '@/primary/infrastructure/composables/alarm';
import { usePomoMiniature } from '@/primary/infrastructure/composables/pomoMiniature';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import { useScreenSize } from '@/primary/infrastructure/composables/screenSize';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';

const props = defineProps<{
    pip?: boolean;
}>();

const { toggleMiniature, isMiniatureAvailable, isMiniatureOpen } =
    usePomoMiniature();

const { isMuted, toggleAlarmVolume } = useAlarm();
const { startNextSession, restartSesion, pause, resume, clearSession } =
    usePomoRunner();
const { sm } = useScreenSize();

const pomoStore = usePomoStore();

const circleRadius = computed(() => {
    if (props.pip) {
        return 60;
    }

    return sm.value ? 90 : 120;
});

const onMiniatureClick = () => {
    if (!isMiniatureOpen()) {
        pomoStore.toggleView();
    }
    toggleMiniature();
};

const onDeleteClick = () => {
    clearSession();
    pomoStore.toggleView();
};
</script>
