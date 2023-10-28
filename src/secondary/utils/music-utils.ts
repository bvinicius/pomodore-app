import { ScaleType } from '@/domain/ScaleType';

export const makeChord = (notes: string[], baseOctave: number) => {
    return notes.map((note) => {
        const strNote = note.slice(0, -1);
        const octave = note.slice(-1);

        return strNote + (Number(octave) + baseOctave);
    });
};

export const isDegreeMinor = (degree: number, scale: ScaleType): boolean => {
    const gaps = scale.split('').map(Number);
    const lastIndex = degree % gaps.length;
    return gaps[degree - 1] + gaps[lastIndex] === 3;
};
