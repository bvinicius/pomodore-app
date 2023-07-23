export const makeChord = (notes: string[], baseOctave: number) => {
    return notes.map((note) =>
        note.endsWith('+')
            ? note.slice(0, -1) + (baseOctave + 1)
            : note + baseOctave
    );
};
