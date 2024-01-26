<template>
    <div class="flex flex-col items-center">
        <div class="relatve flex items-center gap-2">
            <div
                class="absolute z-50 -translate-x-10 md:relative md:translate-x-0 flex flex-col gap-2"
            >
                <PomoArrowButton @click="stepUp" />
                <PomoArrowButton
                    down
                    @click="stepDown"
                />
            </div>
            <div class="flex-col">
                <div class="w-24 md:w-32 relative">
                    <PomoInput
                        v-bind="$attrs"
                        v-model="vModel"
                        type="number"
                        class="w-full py-3 font-semibold text-4xl md:text-6xl text-center rounded-xl pb-6 pomo-input spin-buttons-none"
                        :label="hint"
                    />
                    <span
                        class="font-semibold text-gray-500 absolute bottom-0 left-0 right-0 text-center pb-2 select-none"
                    >
                        {{ hint }}
                    </span>
                </div>
                <div
                    class="text-on-container-500 text-center font-semibold text-sm md:text-base select-none"
                >
                    {{ label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import PomoArrowButton from '@/primary/components/atoms/PomoArrowButton.vue';
import PomoInput from '@/primary/components/atoms/PomoInput.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    modelValue?: number;
    hint?: string;
    label?: string;
    min?: number;
    max?: number;
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

const stepUp = () => {
    if (vModel.value === undefined) {
        return (vModel.value = 0);
    }

    const max = props.max ?? Infinity;
    vModel.value = Math.min(max, vModel.value + 1);
};

const stepDown = () => {
    if (vModel.value === undefined) {
        return (vModel.value = 0);
    }

    const min = props.min ?? -Infinity;
    vModel.value = Math.max(min, vModel.value - 1);
};
</script>
