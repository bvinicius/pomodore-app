import { FileInfo } from './FileInfo';

export interface FileService {
    getAll(): Promise<FileInfo[]>;
    save(song: unknown): Promise<void>;
}
