<template>
    <div class="w-screen h-screen bg-primary-container-500 px-24 py-12">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { PomoRunner } from '@/secondary/PomodoreRunner';

const runner = ref<PomoRunner>();
provide('runner', runner);
</script>
