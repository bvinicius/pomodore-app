import { PomoState } from '@/domain/Pomodore';

export interface PomoMuiltiplayerMessage {
    type: 'pause' | 'play' | 'skip-session' | 'sync';
    payload: PomoState;
}
