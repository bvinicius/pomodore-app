import { App, inject, InjectionKey } from 'vue';
import { createClient } from '@supabase/supabase-js';

import {
    POMO_COUNTER,
    POMO_MULTIPLAYER_SERVICE
} from '@/primary/infrastructure/dependency-symbols';

import MyWorker from '@/secondary/counter-worker/counter-worker?worker';
import { PomoCounterInstance } from '@/secondary/counter-worker/PomoCounterInstance';
import { PomoMultiplayerRepository } from '@/secondary/multiplayer/PomoMultiplayerRepository';

const worker = new MyWorker();

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_API_KEY as string;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export const provide = (app: App) => {
    app.provide(POMO_COUNTER, new PomoCounterInstance(worker));
    app.provide(
        POMO_MULTIPLAYER_SERVICE,
        new PomoMultiplayerRepository(supabaseClient)
    );
};

export const injectSafe = <T>(key: InjectionKey<T>): T => {
    const item = inject<T>(key);
    if (!item) {
        throw Error(`Dependency ${key} not injected!`);
    }
    return item;
};
