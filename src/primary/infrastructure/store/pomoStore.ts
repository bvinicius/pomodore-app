import { defineStore } from 'pinia';
import {
    PomoSessionState,
    PomoSessionType,
    PomoSettings
} from '@/domain/Pomodore';

interface PomoState {
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
        settings: { ...config },
        session: {
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
        isSessionView: (state) => state.currentView === 'session'
    },
    actions: {
        updateSettings(settings: PomoSettings) {
            this.settings = settings;
        },
        toggleView() {
            this.currentView =
                this.currentView === 'settings' ? 'session' : 'settings';
        }
    },
    persist: true
});
