import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { PomoState, usePomoStore } from '../store/pomoStore';
import { watch } from 'vue';
import { usePomoRunner } from './pomoRunner';

interface JoinOptions {
    admin: boolean;
}

interface PomoMuiltiplayerMessage {
    type: 'pause' | 'play' | 'skip-session' | 'sync';
    payload: PomoState;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_API_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const useMultiplayer = () => {
    const pomoStore = usePomoStore();
    const { continueSession } = usePomoRunner();

    const createSession = () => {
        joinSession(pomoStore.id.toString(), { admin: true });
    };

    const joinSession = (roomId: string, opts: Partial<JoinOptions> = {}) => {
        const room = supabase.channel(roomId);

        if (!opts.admin) {
            room.on('presence', { event: 'sync' }, () => {
                const state = room.presenceState<PomoMuiltiplayerMessage>();
                const data = Object.values(
                    state
                ).flat()[0] as PomoMuiltiplayerMessage;

                pomoStore.$state = data.payload;
                continueSession();
            });
        }

        room.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log('Now listening to changes in realtime...');
            }

            if (opts.admin) {
                watch(
                    () => pomoStore.session.paused,
                    (value) => {
                        commit(room, {
                            type: value ? 'pause' : 'play',
                            payload: pomoStore.$state
                        });
                    }
                );

                watch(
                    () => pomoStore.session.current,
                    () => {
                        commit(room, {
                            type: 'skip-session',
                            payload: pomoStore.$state
                        });
                    }
                );

                watch(
                    () => pomoStore.session.timeLeft,
                    (value) => {
                        // Only sync every 10 seconds
                        if (value % 10 !== 0) return;

                        console.log('SYNC');
                        commit(room, {
                            type: 'sync',
                            payload: pomoStore.$state
                        });
                    }
                );
            }
        });
    };

    const commit = (
        room: RealtimeChannel,
        message: PomoMuiltiplayerMessage
    ) => {
        room.track(message);
    };

    return { createSession, joinSession };
};
