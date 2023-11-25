<template>
    <div class="flex flex-col items-center">
        <div class="relatve flex items-center gap-2">
            <div class="absolute z-50 -translate-x-8 flex flex-col gap-2">
                <PomoArrowButton @click="stepUp" />
                <PomoArrowButton
                    down
                    @click="stepDown"
                />
            </div>
            <div class="w-24 md:w-32 relative">
                <PomoInput
                    v-model="vModel"
                    type="number"
                    class="w-full py-3 font-semibold text-4xl md:text-6xl !text-primary-500 text-center rounded-xl pb-6 pomo-input spin-buttons-none"
                    :label="hint"
                />
                <span
                    class="font-semibold text-on-container-400 absolute bottom-0 left-0 right-0 text-center pb-2 select-none"
                >
                    {{ hint }}
                </span>
            </div>
        </div>
        <div class="text-on-container-300 font-semibold text-sm md:text-base">
            {{ label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PomoInput from '@/primary/components/atoms/PomoInput.vue';
import PomoArrowButton from '@/primary/components/atoms/PomoArrowButton.vue';

const props = defineProps<{
    modelValue?: number;
    hint?: string;
    label?: string;
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
    if (!vModel.value) {
        vModel.value = 0;
    }

    vModel.value++;
};

const stepDown = () => {
    if (!vModel.value) {
        vModel.value = 0;
    }

    vModel.value--;
};
</script>
