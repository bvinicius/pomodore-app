import firebase from 'firebase';
import { SongStorage } from '@/domain/SongStorage';

export class FirebaseFileStorage implements SongStorage {
    constructor(private app: firebase.app.App) {}

    save(file: File): Promise<void> {
        const storageRef = this.app.storage().ref();
        const fileRef = storageRef.child(file.name);

        return fileRef.put(file).then();
    }
}
