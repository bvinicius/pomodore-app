import { computed, ref } from 'vue';

const screenSizes = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
};

export const useScreenSize = () => {
    const width = ref(window.innerWidth);
    const height = ref(window.innerHeight);

    const sm = computed(() => width.value < screenSizes.sm);
    const md = computed(
        () => width.value >= screenSizes.sm && width.value < screenSizes.md
    );
    const lg = computed(
        () => width.value >= screenSizes.md && width.value < screenSizes.lg
    );
    const xl = computed(
        () => width.value >= screenSizes.lg && width.value < screenSizes.xl
    );
    const xxl = computed(
        () => width.value >= screenSizes.xl && width.value < screenSizes['2xl']
    );

    new ResizeObserver((entries) => {
        for (const entry of entries) {
            width.value = entry.contentRect.width;
            height.value = entry.contentRect.height;
        }
    }).observe(document.body);

    return { width, height, sm, md, lg, xl, xxl };
};
