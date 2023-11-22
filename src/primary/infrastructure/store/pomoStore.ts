import { defineStore } from 'pinia';
import { PomoSettings } from '@/domain/Pomodore';

export const usePomoStore = defineStore('pomodore', {
    state: (): { pomodore?: PomoSettings } => ({
        pomodore: {
            workSessionLength: 0.1,
            breakSessionLength: 0.2,
            sessions: 3
        }
    }),
    getters: {
        workSession: (state) => state.pomodore?.workSessionLength,
        breakSession: (state) => state.pomodore?.breakSessionLength
    }
});
