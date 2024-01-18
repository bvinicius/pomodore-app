import { Component, computed, createApp } from 'vue';
import { provide } from '@/primary/infrastructure/dependency-injection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = window as any;

export const usePictureInPicture = () => {
    const isActive = computed(() => !!win.documentPictureInPicture.window);
    const isSupported = computed(() => !!win.documentPictureInPicture);

    const startPictureInPicture = async (
        component: Component,
        props: Record<string, unknown> = {}
    ) => {
        if (isActive.value) return console.log('PIP is already active');
        if (!isSupported.value) return console.log('PIP is not supported');

        const rootEl = mountComponent(component, props);
        return startPipWindow(rootEl);
    };

    return { startPictureInPicture, isActive, isSupported };
};

async function startPipWindow(rootEl: HTMLElement) {
    const pipWindow = await win.documentPictureInPicture.requestWindow({
        width: rootEl.clientWidth,
        height: rootEl.clientHeight
    });

    appendStyles(pipWindow);
    pipWindow.document.body.appendChild(rootEl);
}

function mountComponent(
    component: Component,
    props: Record<string, unknown> = {}
) {
    const app = createApp(component, props);
    provide(app);
    const vm = app.mount(document.createElement('div'));
    const rootEl = vm.$el as HTMLElement;
    return rootEl;
}

function appendStyles(pipWindow: Window) {
    [...document.styleSheets].forEach((styleSheet) => {
        const cssRules = [...styleSheet.cssRules]
            .map((rule) => rule.cssText)
            .join('');

        const style = document.createElement('style');

        style.textContent = cssRules;
        pipWindow.document.head.appendChild(style);
    });
}
