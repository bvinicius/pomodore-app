import { FileInfo } from './FileInfo';

export interface FileService {
    getFilesInformation(): Promise<FileInfo[]>;
    getFileURL(fileName: string): Promise<string>;
    save(song: unknown): Promise<void>;
}
