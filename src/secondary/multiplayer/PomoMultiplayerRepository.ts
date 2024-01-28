import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

import { PomoMuiltiplayerMessage } from '@/domain/multiplayer/PomoMultiplayerMessage';
import { PomoMultiplayerService } from '@/domain/multiplayer/PomoMultiplayerService';

export class PomoMultiplayerRepository implements PomoMultiplayerService {
    private room: RealtimeChannel | null = null;

    constructor(private client: SupabaseClient) {}

    async createSession(roomId: string): Promise<void> {
        await this.joinSession(roomId);
    }

    joinSession(roomId: string): Promise<void> {
        this.room = this.client.channel(roomId);

        return new Promise((resolve, reject) => {
            this.room?.subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    resolve();
                }
            });

            setTimeout(reject, 1000);
        });
    }

    leaveSession(): void {
        this.room?.unsubscribe();
    }

    emit(message: PomoMuiltiplayerMessage): void {
        this.room?.track(message);
    }

    onMessage(callback: (message: PomoMuiltiplayerMessage) => void): void {
        this.room?.on('presence', { event: 'sync' }, () => {
            if (!this.room) {
                return console.error('Room is not initialized');
            }

            const data = this.getPresenceState(this.room);
            if (!data) return;
            callback(data);
        });
    }

    private getPresenceState = (
        room: RealtimeChannel
    ): PomoMuiltiplayerMessage | null => {
        const state = room.presenceState<PomoMuiltiplayerMessage>();
        if (!state) return null;

        return Object.values(state).flat()[0] as PomoMuiltiplayerMessage;
    };
}
