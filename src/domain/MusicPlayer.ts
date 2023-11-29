export interface MusicPlayer {
    isPlaying(): boolean;
    pause(): void;
    play(url: string): void;
    resume(): void;
    togglePlay(): void;
    getSongDuration(): number;
    getSongCurrentTime(): number;
}
