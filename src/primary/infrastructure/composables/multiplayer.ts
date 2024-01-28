import { watch } from 'vue';

import { PomoMultiplayerService } from '@/domain/multiplayer/PomoMultiplayerService';

import { usePomoRunner } from '@/primary/infrastructure/composables/pomoRunner';
import { injectSafe } from '@/primary/infrastructure/dependency-injection';
import { POMO_MULTIPLAYER_SERVICE } from '@/primary/infrastructure/dependency-symbols';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';

export const useMultiplayer = () => {
    const multiplayerService = injectSafe<PomoMultiplayerService>(
        POMO_MULTIPLAYER_SERVICE
    );

    const pomoStore = usePomoStore();
    const { continueSession } = usePomoRunner();

    const createSession = async () => {
        await multiplayerService.createSession(pomoStore.id.toString());
        watchPomodoreState();
    };

    const joinSession = async (roomId: string) => {
        await multiplayerService.joinSession(roomId);

        multiplayerService.onMessage((message) => {
            pomoStore.$state = {
                ...message.payload,
                currentView: pomoStore.currentView
            };
            continueSession();
        });
    };

    const watchPomodoreState = () => {
        watch(
            () => pomoStore.session.paused,
            () =>
                multiplayerService.emit({
                    type: 'pause',
                    payload: pomoStore.$state
                })
        );

        watch(
            () => pomoStore.session.current,
            () => {
                multiplayerService.emit({
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
                multiplayerService.emit({
                    type: 'sync',
                    payload: pomoStore.$state
                });
            }
        );
    };

    return { createSession, joinSession };
};
