<template>
    <input
        ref="input"
        v-model="vModel"
        type="text"
        class="focus-visible:outline-blue rounded-md border border-on-container-500 bg-transparent px-2 py-1 text-on-container-500"
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
