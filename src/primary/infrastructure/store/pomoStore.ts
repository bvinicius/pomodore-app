import { defineStore } from 'pinia';
import { PomoSessionType, PomoSettings } from '@/domain/Pomodore';

interface PomoState {
    settings: PomoSettings;
    session: Partial<{
        current: PomoSessionType;
        timeLeft: string;
        isOver: boolean;
    }>;
}

export const usePomoStore = defineStore('pomodore', {
    state: (): PomoState => ({
        settings: {
            workSessionLength: 40,
            breakSessionLength: 5,
            sessions: 3
        },
        session: {}
    }),
    getters: {
        workSession: (state) => state.settings?.workSessionLength,
        breakSession: (state) => state.settings?.breakSessionLength,
        sessions: (state) => state.settings?.sessions
    },
    persist: true
});
