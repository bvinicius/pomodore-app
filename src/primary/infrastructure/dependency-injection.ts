import { App, InjectionKey, inject } from 'vue';
import { SONG_STORAGE } from './dependency-symbols';
import { FirebaseFileStorage } from '@/secondary/song-storage/FirebaseFileStorage';
import firebase from '@/primary/infrastructure/firebase';

export const provide = (app: App) => {
    app.provide(SONG_STORAGE, new FirebaseFileStorage(firebase));
};

export const injectSafe = <T>(key: InjectionKey<T>): T => {
    const item = inject<T>(key);
    if (!item) {
        throw Error(`Dependency ${key} not injected!`);
    }
    return item;
};
