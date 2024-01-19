<template>
    <div class="w-screen h-screen px-12 py-8 md:px-24 md:py-12">
        <router-view></router-view>
    </div>

    <speed-insights></speed-insights>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';

const { continueSession, pause } = usePomoRunner();

const pomoStore = usePomoStore();

onMounted(() => {
    if (pomoStore.session.started) {
        continueSession();
        pause();
    }
});
</script>
