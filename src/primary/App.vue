<template>
    <div class="w-screen h-screen px-12 py-8 md:px-24 md:py-12">
        <router-view></router-view>
    </div>

    <speed-insights></speed-insights>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { useRouter } from 'vue-router';

import { useMultiplayer } from '@/primary/infrastructure/composables/multiplayer';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';

const router = useRouter();
const { continueSession, pause } = usePomoRunner();
const { joinSession } = useMultiplayer();

const pomoStore = usePomoStore();

onMounted(async () => {
    if (pomoStore.session.started) {
        continueSession();
        pause();
    }

    await router.isReady();
    if (router.currentRoute.value.params.id) {
        joinSession(router.currentRoute.value.params.id.toString());
    }
});
</script>
