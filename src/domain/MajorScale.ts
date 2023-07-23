const allKeys = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
];

export class MajorScale {
    private scaleBehavior = [2, 2, 1, 2, 2, 2, 1];
    private relevantIntervals = [1, 3, 5, 7];

    getChord(root: string, degree: number): string[] {
        const notesInScale = this.getNotesInScale(root, degree);

        const chord = this.relevantIntervals.map((interval) => {
            return notesInScale[interval - 1];
        });

        return chord;
    }

    private getNotesInScale(root: string, degree: number): string[] {
        const chromaticScale = this.startScaleFromNote(root);
        const notesInScale: string[] = [];

        let currentGap = 0;
        this.scaleBehavior.forEach((gap) => {
            notesInScale.push(chromaticScale[currentGap]);
            currentGap += gap;
        });

        return [
            ...notesInScale.slice(degree - 1),
            ...notesInScale.slice(0, degree - 1)
        ];
    }

    private startScaleFromNote(note: string) {
        const index = allKeys.indexOf(note);
        return [...allKeys.slice(index), ...allKeys.slice(0, index)];
    }
}
