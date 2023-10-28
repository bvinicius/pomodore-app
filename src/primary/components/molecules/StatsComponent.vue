<template>
    <div>### Staff Only ###</div>

    <div
        v-for="entries in Object.entries(props.data)"
        :key="entries[0]"
    >
        {{ entries[0] }}: <span>{{ entries[1] }}</span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: object;
}>();
</script>
