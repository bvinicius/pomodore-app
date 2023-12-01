<template>
    <input
        ref="input"
        v-model="vModel"
        type="text"
        class="bg-transparent border border-on-container-500 text-on-container-500 py-1 px-2 rounded-md focus-visible:outline-blue"
        @focus="input?.select()"
    />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{ modelValue?: unknown }>();

const emit = defineEmits<{
    (e: 'update:model-value', v: unknown): void;
}>();

const input = ref<HTMLInputElement | null>(null);

const vModel = computed({
    get() {
        return props.modelValue;
    },
    set(v: unknown) {
        emit('update:model-value', v);
    }
});
</script>
