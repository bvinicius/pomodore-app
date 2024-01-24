import { createClient } from '@supabase/supabase-js';
import { usePomoStore } from '../store/pomoStore';
import { watch } from 'vue';

interface JoinOptions {
    admin: boolean;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_API_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const useMultiplayer = () => {
    const pomoStore = usePomoStore();

    const createSession = () => {
        joinSession(pomoStore.id.toString(), { admin: true });
    };

    const joinSession = (roomId: string, opts: Partial<JoinOptions> = {}) => {
        const room = supabase.channel(roomId);

        if (!opts.admin) {
            room.on('presence', { event: 'sync' }, () => {
                const state = room.presenceState();
                // save the state to the store.
                console.log('sync', state);
            });
        }

        room.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log('Now listening to changes in realtime...');
            }

            if (opts.admin) {
                console.log('admin', pomoStore.$state);

                watch(
                    () => pomoStore.$state,
                    (value) => {
                        room.track(value);
                    },
                    { deep: true }
                );
            }
        });
    };

    return { createSession, joinSession };
};
