import { defineStore } from 'pinia';
import {
    PomoSessionState,
    PomoSessionType,
    PomoSettings
} from '@/domain/Pomodore';

interface PomoState {
    id: number;
    settings: PomoSettings;
    session: PomoSessionState;
    currentView: 'session' | 'settings';
}

const config: PomoSettings = {
    workSessionLength: 40,
    breakSessionLength: 5
};

export const usePomoStore = defineStore('pomodore', {
    state: (): PomoState => ({
        id: Math.random(),
        settings: { ...config },
        session: {
            id: 0,
            current: PomoSessionType.WORK,
            timeLeft: config.workSessionLength * 60,
            isOver: false,
            started: false,
            paused: false
        },
        currentView: 'settings'
    }),
    getters: {
        workSession: (state) => state.settings?.workSessionLength,
        breakSession: (state) => state.settings?.breakSessionLength,
        currentSessionLength: (state) =>
            state.session.current === PomoSessionType.WORK
                ? state.settings.workSessionLength
                : state.settings.breakSessionLength,
        isSettingsView: (state) => state.currentView === 'settings',
        isSessionView: (state) => state.currentView === 'session',
        nextSession: (state) =>
            state.session.current === PomoSessionType.WORK
                ? PomoSessionType.BREAK
                : PomoSessionType.WORK
    },
    actions: {
        updateSettings(settings: PomoSettings) {
            this.settings = settings;
            this.id++;
        },
        toggleView() {
            this.currentView =
                this.currentView === 'settings' ? 'session' : 'settings';
        }
    },
    persist: true
});
