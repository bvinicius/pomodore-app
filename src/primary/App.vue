<template>
    <div class="w-screen h-screen px-12 py-8 md:px-24 md:py-12">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { POMO_RUNNER } from '@/primary/infrastructure/dependency-symbols';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { PomoRunner } from '@/secondary/PomodoreRunner';

const pomoStore = usePomoStore();
const showRouter = ref(false);

const runner = pomoStore.settings
    ? ref<PomoRunner>(
          PomoRunner.fromState(pomoStore.settings, pomoStore.session)
      )
    : ref<PomoRunner>();

provide(POMO_RUNNER, runner);

onMounted(() => {
    setTimeout(() => {
        showRouter.value = true;
    }, 500);
});
</script>
