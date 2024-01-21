import { defineStore } from 'pinia';

interface PreferencesState {
    alarmVolume: number;
}

export const usePreferencesStore = defineStore('preferences', {
    state: (): PreferencesState => ({
        alarmVolume: 0.5
    }),
    persist: true
});
