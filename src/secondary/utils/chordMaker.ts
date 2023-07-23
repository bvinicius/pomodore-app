export const makeChord = (notes: string[], baseOctave: number) => {
    return notes.map((note) => {
        const strNote = note.slice(0, -1);
        const octave = note.slice(-1);

        return strNote + (Number(octave) + baseOctave);
    });
};
