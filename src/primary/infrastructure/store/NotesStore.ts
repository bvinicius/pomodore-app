import { ScaleType } from '@/domain/ScaleType';
import { defineStore } from 'pinia';

interface NotesState {
    degree?: number;
    intervals: number[];
    scale: ScaleType;
    tonalCenter: string;
}

export const useNotesStore = defineStore('notes', {
    state: (): NotesState => ({
        degree: undefined,
        intervals: [1, 3, 5, 7],
        scale: ScaleType.MAJOR,
        tonalCenter: 'C'
    }),
    actions: {
        toggleExtension(ext: number) {
            this.intervals.includes(ext)
                ? this.intervals.splice(this.intervals.indexOf(ext), 1)
                : this.intervals.push(ext);

            this.intervals.sort();
        }
    },
    persist: true
});
