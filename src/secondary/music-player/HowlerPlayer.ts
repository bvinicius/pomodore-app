import { MusicPlayer } from '@/domain/MusicPlayer';
import { Howl } from 'howler';

export class HowlerPlayer implements MusicPlayer {
    private sound: Howl | null = null;

    play(url: string): void {
        if (this.isPlaying()) {
            this.sound?.stop();
        }

        this.sound = new Howl({
            src: [url],
            html5: true,
            loop: true
        });
        this.sound.play();
    }

    pause(): void {
        this.sound?.pause();
    }

    resume(): void {
        this.sound?.play();
    }

    isPlaying(): boolean {
        return this.sound?.playing() ?? false;
    }

    togglePlay(): void {
        this.isPlaying() ? this.pause() : this.resume();
    }

    getSongCurrentTime(): number {
        return this.sound?.seek() ?? 0;
    }

    getSongDuration(): number {
        return this.sound?.duration() ?? 0;
    }
}
