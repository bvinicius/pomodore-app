import { ScaleType } from '@/domain/ScaleType';
import { defineStore } from 'pinia';

interface NotesState {
    scale: ScaleType;
    tonalCenter: string;
    degree?: number;
}

export const useNotesStore = defineStore('notes', {
    state: (): NotesState => ({
        tonalCenter: 'C',
        degree: undefined,
        scale: ScaleType.MAJOR
    }),
    persist: true
});
