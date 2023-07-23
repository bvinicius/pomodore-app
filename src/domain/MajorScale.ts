import { allKeys } from '@/secondary/utils/music-theory';

export class MajorScale {
    private scaleBehavior = [2, 2, 1, 2, 2, 2, 1];
    private relevantIntervals = [1, 3, 5, 7];

    getNotes(root: string, degree: number): string[] {
        const notesInScale = this.getNotesInScale(root, degree);

        const chord = this.relevantIntervals.map((interval) => {
            return notesInScale[interval - 1];
        });

        return chord;
    }

    private getNotesInScale(root: string, degree: number): string[] {
        const chromaticScale = this.startScaleFromNote(root);
        let notesInScale: string[] = [];

        let currentGap = 0;
        this.scaleBehavior.forEach((gap) => {
            notesInScale.push(chromaticScale[currentGap]);
            currentGap += gap;
        });

        const startingNote = notesInScale[degree - 1];
        currentGap = 0;
        notesInScale = [];

        const behaviorDegree = [
            ...this.scaleBehavior.slice(degree - 1),
            ...this.scaleBehavior.slice(0, degree - 1)
        ];

        behaviorDegree.forEach((gap) => {
            const note = this.increment(startingNote, currentGap);
            notesInScale.push(note);
            currentGap += gap;
        });

        return notesInScale;
    }

    private startScaleFromNote(note: string) {
        const index = allKeys.indexOf(note);
        return [
            ...allKeys.slice(index).map((note) => note + '0'),
            ...allKeys.slice(0, index).map((note) => note + '1')
        ];
    }

    private increment(note: string, interval: number) {
        const strNote = note.slice(0, -1);
        const octave = Number(note.slice(-1));

        const index = allKeys.indexOf(strNote);
        const newIndex = index + interval;
        const newOctave = Math.floor(newIndex / allKeys.length) + octave;
        return allKeys[newIndex % allKeys.length] + newOctave;
    }
}
