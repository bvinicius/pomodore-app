import type { SynthOptions } from 'tone';
import type { RecursivePartial } from 'tone/build/esm/core/util/Interface';

export const keysPreset: RecursivePartial<SynthOptions> = {
    oscillator: { type: 'sine' },
    volume: -10
};

export const bassPreset: RecursivePartial<SynthOptions> = {
    oscillator: { type: 'sine' },
    volume: -10
};

export const synthPreset: RecursivePartial<SynthOptions> = {
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 4, sustain: 1 },
    detune: 5,
    volume: -20
};
