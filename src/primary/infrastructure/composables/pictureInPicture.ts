import { ComponentPublicInstance, createApp } from 'vue';
import { provide } from '../dependency-injection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = window as any;

export const usePictureInPicture = () => {
    const startPictureInPicture = async (
        component: ComponentPublicInstance,
        props: Record<string, unknown> = {}
    ) => {
        if (!isEnabled) {
            console.log('Picture in picture is not supported');
        }

        const app = createApp(component, props);
        provide(app);
        const vm = app.mount(document.createElement('div'));

        const pipDocument = await win.documentPictureInPicture.requestWindow();

        [...document.styleSheets].forEach((styleSheet) => {
            const cssRules = [...styleSheet.cssRules]
                .map((rule) => rule.cssText)
                .join('');
            const style = document.createElement('style');

            style.textContent = cssRules;
            pipDocument.document.head.appendChild(style);
        });

        pipDocument.document.body.appendChild(vm.$el);
    };

    const isEnabled = () => !!win.documentPictureInPicture;

    return { startPictureInPicture };
};
