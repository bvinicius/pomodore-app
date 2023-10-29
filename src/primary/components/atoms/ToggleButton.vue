<template>
    <div
        class="cursor-pointer flex justify-center items-center"
        :class="[
            checked
                ? 'bg-primary-container-400 drop-shadow-primary-active border border-primary-container-500'
                : 'bg-primary-container-500 drop-shadow-primary border'
        ]"
        @click="onClick"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    checked: boolean;
    exclusive?: boolean;
}>();

const emit = defineEmits<{
    (e: 'select'): void;
    (e: 'unselect'): void;
}>();

const onClick = () => {
    if (props.exclusive) {
        emit('select');
        return;
    }

    props.checked ? emit('unselect') : emit('select');
};
</script>
