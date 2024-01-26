<template>
    <div class="flex flex-col items-center">
        <div class="relatve flex items-center gap-2">
            <div
                class="absolute z-50 flex -translate-x-10 flex-col gap-2 md:relative md:translate-x-0"
            >
                <PomoArrowButton @click="stepUp" />
                <PomoArrowButton
                    down
                    @click="stepDown"
                />
            </div>
            <div class="flex-col">
                <div class="relative w-24 md:w-32">
                    <PomoInput
                        v-bind="$attrs"
                        v-model="vModel"
                        type="number"
                        class="pomo-input spin-buttons-none w-full rounded-xl py-3 pb-6 text-center text-4xl font-semibold md:text-6xl"
                        :label="hint"
                    />
                    <span
                        class="absolute bottom-0 left-0 right-0 select-none pb-2 text-center font-semibold text-gray-500"
                    >
                        {{ hint }}
                    </span>
                </div>
                <div
                    class="select-none text-center text-sm font-semibold text-on-container-500 md:text-base"
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
