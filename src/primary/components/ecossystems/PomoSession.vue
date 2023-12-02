<template>
    <div class="flex flex-col justify-between gap-8">
        <div
            v-if="pomoStore.session.current"
            class="flex justify-center items-center"
        >
            <span
                class="text-2xl md:text-3xl font-semibold text-on-container-500"
            >
                {{
                    pomoStore.session.current === PomoSessionType.WORK
                        ? 'Work session'
                        : 'Break session'
                }}
            </span>
        </div>
        <PomoSessionCountdown
            :key="pomoStore.session.current"
            class="mx-auto animate-fade"
            :duration="pomoStore.currentSessionLength * 60"
            :radius="150"
            :time-left="pomoStore.session.timeLeft"
            :paused="pomoStore.session.paused"
        />
        <div class="flex justify-center gap-4 text-gray-777">
            <PomoIcon
                name="restart_alt"
                button
                @click="restartSesion"
            ></PomoIcon>
            <PomoIcon
                :name="pomoStore.session.paused ? 'play_arrow' : 'pause'"
                button
                @click="() => (pomoStore.session.paused ? resume() : pause())"
            ></PomoIcon>
            <PomoIcon
                name="fast_forward"
                button
                @click="startNextSession"
            ></PomoIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PomoSessionType } from '@/domain/Pomodore';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionCountdown from '@/primary/components/molecules/PomoSessionCountdown.vue';
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';

const { startNextSession, restartSesion, pause, resume } = usePomoRunner();

const pomoStore = usePomoStore();
</script>
