import { defineStore } from 'pinia';

import { PomoSessionType, PomoSettings, PomoState } from '@/domain/Pomodore';

import { createId } from '@/secondary/utils/id-utils';

const config: PomoSettings = {
    workSessionLength: 40,
    breakSessionLength: 5
};

type PomoStoreState = PomoState & {
    currentView: 'settings' | 'session';
};

export const usePomoStore = defineStore('pomodore', {
    state: (): PomoStoreState => ({
        id: createId(),
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
            this.id = createId();
        },
        toggleView() {
            this.currentView =
                this.currentView === 'settings' ? 'session' : 'settings';
        }
    },
    persist: true
});
