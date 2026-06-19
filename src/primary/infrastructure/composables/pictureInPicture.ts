import { Component, computed, createApp } from 'vue';
import { provide } from '@/primary/infrastructure/dependency-injection';

let pipWindow: Window | null = null;

export const usePictureInPicture = () => {
    const isSupported = computed(() => true);
    const isActive = () => !!pipWindow && !pipWindow.closed;

    const startPictureInPicture = (
        component: Component,
        props: Record<string, unknown> = {}
    ) => {
        if (isActive()) return console.log('PIP is already active');

        const popup = window.open(
            '',
            '_blank',
            'popup=yes,width=240,height=220'
        );

        if (!popup) return console.log('Popup was blocked');

        pipWindow = popup;
        popup.addEventListener('beforeunload', () => {
            pipWindow = null;
        });

        appendStyles(popup);
        popup.document.body.style.margin = '0';

        const rootEl = mountComponent(component, props);
        popup.document.body.appendChild(rootEl);
    };

    const closePictureInPicture = () => {
        if (!isActive()) return;
        pipWindow?.close();
        pipWindow = null;
    };

    return {
        startPictureInPicture,
        closePictureInPicture,
        isActive,
        isSupported
    };
};

function appendStyles(target: Window) {
    [...document.styleSheets].forEach((styleSheet) => {
        try {
            const cssRules = [...styleSheet.cssRules]
                .map((rule) => rule.cssText)
                .join('');
            const style = document.createElement('style');
            style.textContent = cssRules;
            target.document.head.appendChild(style);
        } catch {
            // cross-origin stylesheets are not accessible
        }
    });
}

function mountComponent(
    component: Component,
    props: Record<string, unknown> = {}
) {
    const app = createApp(component, props);
    provide(app);
    const vm = app.mount(document.createElement('div'));
    return vm.$el as HTMLElement;
}
