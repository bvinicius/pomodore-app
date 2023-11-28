import firebase from 'firebase';
import { FileService } from '@/domain/FileService';
import { FileInfo } from '@/domain/FileInfo';

export class FirebaseFileStorage implements FileService {
    constructor(private app: firebase.app.App) {}

    save(file: File): Promise<void> {
        const storageRef = this.app.storage().ref();
        const fileRef = storageRef.child(file.name);

        return fileRef.put(file).then();
    }

    getFilesInformation(): Promise<FileInfo[]> {
        const storageRef = firebase.storage().ref();
        return storageRef.listAll().then((res) =>
            res.items.map((file) => ({
                name: file.name
            }))
        );
    }

    getFileURL(fileName: string) {
        const storageRef = firebase.storage().ref();
        return storageRef.child(fileName).getDownloadURL();
    }
}
