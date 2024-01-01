import { App, InjectionKey, inject } from 'vue';
import {
    POMO_COUNTER,
    FILE_SERVICE,
    MUSIC_PLAYER
} from '@/primary/infrastructure/dependency-symbols';
import { FirebaseFileStorage } from '@/secondary/files-service/FirebaseFileService';
import firebase from '@/primary/infrastructure/firebase';
import { HowlerPlayer } from '@/secondary/music-player/HowlerPlayer';
import MyWorker from '@/secondary/counter-worker/counter-worker?worker';
import { PomoCounterInstance } from '@/secondary/counter-worker/PomoCounterInstance';

export const provide = (app: App) => {
    app.provide(FILE_SERVICE, new FirebaseFileStorage(firebase));
    app.provide(MUSIC_PLAYER, new HowlerPlayer());
    app.provide(POMO_COUNTER, new PomoCounterInstance(new MyWorker()));
};

export const injectSafe = <T>(key: InjectionKey<T>): T => {
    const item = inject<T>(key);
    if (!item) {
        throw Error(`Dependency ${key} not injected!`);
    }
    return item;
};
