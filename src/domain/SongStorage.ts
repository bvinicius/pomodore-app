export interface SongStorage {
    save(song: unknown): Promise<void>;
}
