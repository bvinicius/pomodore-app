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
    persist: true
});
