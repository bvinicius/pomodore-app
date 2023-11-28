import { App, InjectionKey, inject } from 'vue';
import { FILE_SERVICE } from './dependency-symbols';
import { FirebaseFileStorage } from '@/secondary/files-service/FirebaseFileService';
import firebase from '@/primary/infrastructure/firebase';

export const provide = (app: App) => {
    app.provide(FILE_SERVICE, new FirebaseFileStorage(firebase));
};

export const injectSafe = <T>(key: InjectionKey<T>): T => {
    const item = inject<T>(key);
    if (!item) {
        throw Error(`Dependency ${key} not injected!`);
    }
    return item;
};
