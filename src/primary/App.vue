<template>
    <div class="w-screen h-screen px-12 py-8 md:px-24 md:py-12">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';

const { continueSession } = usePomoRunner();
const pomoStore = usePomoStore();

onMounted(() => {
    if (pomoStore.session.started) {
        continueSession();
    }
});
</script>
