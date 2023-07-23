import { defineStore } from 'pinia';

interface NotesState {
    tonalCenter: string;
    degree?: number;
}

export const useNotesStore = defineStore('notes', {
    state: (): NotesState => ({
        tonalCenter: 'C',
        degree: undefined
    })
});
