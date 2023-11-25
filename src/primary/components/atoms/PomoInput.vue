<template>
    <input
        ref="input"
        v-model="vModel"
        type="text"
        class="bg-primary-container-400 border border-gray-777 text-on-container-300 py-1 px-2 rounded-md focus-visible:outline-blue"
    />
</template>

<script setup lang="ts">
import { ComponentPublicInstance, computed, ref } from 'vue';

export interface PomoInputWrapper extends ComponentPublicInstance {
    stepUp: () => void;
    stepDown: () => void;
}

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

defineExpose({
    stepUp: () => input.value?.stepUp(),
    stepDown: () => input.value?.stepDown()
});
</script>
