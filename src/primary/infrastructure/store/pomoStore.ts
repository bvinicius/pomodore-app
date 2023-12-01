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

const config: PomoSettings = {
    workSessionLength: 40,
    breakSessionLength: 5,
    sessions: 3
};

export const usePomoStore = defineStore('pomodore', {
    state: (): PomoState => ({
        settings: { ...config },
        session: {
            current: PomoSessionType.WORK,
            timeLeft: config.workSessionLength * 60,
            isOver: false,
            started: false,
            paused: false
        }
    }),
    getters: {
        workSession: (state) => state.settings?.workSessionLength,
        breakSession: (state) => state.settings?.breakSessionLength,
        currentSessionLength: (state) =>
            state.session.current === PomoSessionType.WORK
                ? state.settings.workSessionLength
                : state.settings.breakSessionLength
    },
    persist: true
});
