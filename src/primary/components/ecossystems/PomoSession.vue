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
            class="mx-auto"
            :from="pomoStore.currentSessionLength * 60"
            :radius="150"
            :time-left="pomoStore.session.timeLeft || 0"
        />
        <div class="flex flex-col items-start gap-2">
            <div
                class="flex items-center justify-center cursor-pointer text-gray-777 gap-1"
                @click="startNextSession"
            >
                <PomoIcon name="fast_forward"></PomoIcon>
                <span class="font-semibold"
                    >Skip to
                    {{
                        pomoStore.session.current === PomoSessionType.BREAK
                            ? 'work session'
                            : 'break session'
                    }}</span
                >
            </div>
            <div
                class="flex items-center justify-center cursor-pointer text-gray-777 gap-1"
                @click="restartSesion"
            >
                <PomoIcon name="restart_alt"></PomoIcon>
                <span class="font-semibold">Restart session</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PomoSessionType } from '@/domain/Pomodore';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionCountdown from '@/primary/components/molecules/PomoSessionCountdown.vue';
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';

const { startNextSession, restartSesion } = usePomoRunner();

const pomoStore = usePomoStore();
</script>
