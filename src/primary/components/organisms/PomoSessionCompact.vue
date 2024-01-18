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

        <div class="flex items-center gap-4">
            <PomoIcon
                button
                name="picture_in_picture_alt"
                title="Open picture in picture"
                @click.stop="
                    startPictureInPicture(PomoSessionPip, { pip: true })
                "
            ></PomoIcon>

            <PomoIcon
                button
                name="open_in_new"
                title="See session"
                @click.stop="pomoStore.toggleView()"
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
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import PomoIcon from '@/primary/components/atoms/PomoIcon.vue';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import { usePictureInPicture } from '@/primary/infrastructure/composables/pictureInPicture';
import { toMinuteFormat } from '@/secondary/utils/date-utils';
import PomoSessionPip from '@/primary/components/organisms/PomoSessionPip.vue';

const { startNextSession, clearSession, pause, resume } = usePomoRunner();
const { startPictureInPicture } = usePictureInPicture();

const pomoStore = usePomoStore();
</script>
