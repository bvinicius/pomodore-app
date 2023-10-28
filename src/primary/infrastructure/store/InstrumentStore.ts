import { defineStore } from 'pinia';

interface InstrumentState {
    keys: boolean;
    bass: boolean;
    synth: boolean;
}

export const useInstrumentStore = defineStore('instrument', {
    state: (): InstrumentState => ({
        keys: true,
        bass: true,
        synth: true
    }),
    persist: true
});
