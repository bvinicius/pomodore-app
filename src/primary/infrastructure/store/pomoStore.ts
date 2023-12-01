import { defineStore } from 'pinia';
import {
    PomoSessionState,
    PomoSessionType,
    PomoSettings
} from '@/domain/Pomodore';

interface PomoState {
    settings: PomoSettings;
    session: PomoSessionState;
}

const config = {
    workSessionLength: 40,
    breakSessionLength: 5,
    sessions: 3
};

export const usePomoStore = defineStore('pomodore', {
    state: (): PomoState => ({
        settings: { ...config },
        session: {
            timeLeft: config.workSessionLength * 60,
            current: PomoSessionType.WORK,
            isOver: false
        }
    }),
    getters: {
        workSession: (state) => state.settings?.workSessionLength,
        breakSession: (state) => state.settings?.breakSessionLength,
        currentSessionLength: (state) =>
            state.session.current === PomoSessionType.WORK
                ? state.settings.workSessionLength
                : state.settings.breakSessionLength,
        sessions: (state) => state.settings?.sessions,
        percentageLeft: (state) =>
            state.session.timeLeft / 60 / state.settings.workSessionLength
    },
    persist: true
});
