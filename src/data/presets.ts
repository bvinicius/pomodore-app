import type { SynthOptions } from 'tone';
import type { RecursivePartial } from 'tone/build/esm/core/util/Interface';

export const keysPreset: RecursivePartial<SynthOptions> = {
    oscillator: { type: 'triangle' },
    envelope: { sustain: 1, attack: 0.05 },
    portamento: 1,
    detune: 5,
    volume: -15
};

export const bassPreset: RecursivePartial<SynthOptions> = {
    oscillator: { type: 'sine' },
    envelope: { attack: 1, sustain: 1 },
    portamento: 0.2,
    volume: -8
};

export const synthPreset: RecursivePartial<SynthOptions> = {
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 1, sustain: 1, decay: 1 },
    detune: 24,
    volume: -20
};
