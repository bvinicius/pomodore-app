<template>
    <div class="w-32 relative">
        <PomoInput
            v-model="vModel"
            type="number"
            class="w-full py-3 font-semibold text-6xl !text-primary-500 text-center rounded-xl pb-6 pomp-input"
            :label="hint"
        />
        <span
            class="font-semibold text-on-container-400 absolute bottom-0 left-0 right-0 text-center pb-2"
        >
            {{ hint }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PomoInput from '@/primary/components/atoms/PomoInput.vue';

const props = defineProps<{
    modelValue?: number;
    hint?: string;
}>();

const emit = defineEmits<{
    (e: 'update:model-value', v: number | undefined): void;
}>();

const vModel = computed<number | undefined>({
    get() {
        return props.modelValue;
    },
    set(v: number | undefined) {
        emit('update:model-value', v);
    }
});
</script>
