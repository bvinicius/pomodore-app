import { App, InjectionKey, inject } from 'vue';
import { POMO_COUNTER } from '@/primary/infrastructure/dependency-symbols';
import MyWorker from '@/secondary/counter-worker/counter-worker?worker';
import { PomoCounterInstance } from '@/secondary/counter-worker/PomoCounterInstance';

export const provide = (app: App) => {
    app.provide(POMO_COUNTER, new PomoCounterInstance(new MyWorker()));
};

export const injectSafe = <T>(key: InjectionKey<T>): T => {
    const item = inject<T>(key);
    if (!item) {
        throw Error(`Dependency ${key} not injected!`);
    }
    return item;
};
