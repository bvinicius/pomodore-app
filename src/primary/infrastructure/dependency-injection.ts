import { App, InjectionKey, inject } from 'vue';
import { FILE_SERVICE, MUSIC_PLAYER } from './dependency-symbols';
import { FirebaseFileStorage } from '@/secondary/files-service/FirebaseFileService';
import firebase from '@/primary/infrastructure/firebase';
import { HowlerPlayer } from '@/secondary/music-player/HowlerPlayer';

export const provide = (app: App) => {
    app.provide(FILE_SERVICE, new FirebaseFileStorage(firebase));
    app.provide(MUSIC_PLAYER, new HowlerPlayer());
};

export const injectSafe = <T>(key: InjectionKey<T>): T => {
    const item = inject<T>(key);
    if (!item) {
        throw Error(`Dependency ${key} not injected!`);
    }
    return item;
};
