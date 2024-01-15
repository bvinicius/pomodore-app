<template>
    <div class="flex flex-col justify-between gap-8">
        <div
            v-if="pomoStore.session.current"
            class="flex justify-center items-center"
        >
            <div
                v-if="pomoStore.session.isOver"
                class="flex flex-col items-center animate-fade"
            >
                <span class="text-2xl md:text-3xl font-semibold">
                    Time's up!
                </span>
            </div>
            <span
                v-else
                class="text-2xl md:text-2xl font-semibold text-on-container-500 animate-fade"
            >
                {{ pomoStore.session.current.toString() }} session
            </span>
        </div>
        <PomoSessionCountdown
            :key="pomoStore.session.current"
            class="mx-auto animate-fade"
            :duration="pomoStore.currentSessionLength * 60"
            :radius="sm ? 90 : 120"
            :time-left="pomoStore.session.timeLeft"
            :paused="pomoStore.session.paused"
        />
        <PomoButton
            v-if="pomoStore.session.isOver"
            class="mx-auto"
            outline
            @click="startNextSession"
        >
            <div class="flex items-center gap-2">
                <PomoIcon name="skip_next" />
                {{ `Start ${pomoStore.nextSession.toString()}` }}
            </div>
        </PomoButton>
        <div
            v-else
            class="flex justify-center gap-4 text-gray-777"
        >
            <PomoIcon
                button
                name="restart_alt"
                title="Restart session"
                @click="restartSesion"
            ></PomoIcon>
            <PomoIcon
                button
                :name="pomoStore.session.paused ? 'play_arrow' : 'pause'"
                :title="pomoStore.session.paused ? 'Resume' : 'Pause'"
                @click="() => (pomoStore.session.paused ? resume() : pause())"
            ></PomoIcon>
            <PomoIcon
                button
                name="fast_forward"
                title="Start next session"
                @click="startNextSession"
            ></PomoIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoSessionCountdown from '@/primary/components/molecules/PomoSessionCountdown.vue';
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import PomoButton from '@/primary/components/atoms/PomoButton.vue';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import { useScreenSize } from '@/primary/infrastructure/composables/screenSize';

const { startNextSession, restartSesion, pause, resume } = usePomoRunner();
const { sm } = useScreenSize();

const pomoStore = usePomoStore();
</script>
