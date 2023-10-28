import { allKeys } from '@/secondary/utils/music-theory';
import { ScaleType } from './ScaleType';

export class ChordGenerator {
    private relevantIntervals = [1, 3, 5, 7];

    getNotes(root: string, degree: number, scaleType: ScaleType): string[] {
        const notesInScale = this.getNotesInScale(root, degree, scaleType);

        const chord = this.relevantIntervals.map((interval) => {
            return notesInScale[interval - 1];
        });

        return chord;
    }

    private getNotesInScale(
        root: string,
        degree: number,
        scaleType: ScaleType
    ): string[] {
        const chromaticScale = this.startScaleFromNote(root);
        const scaleBehavior = scaleType.split('').map(Number);

        let notesInScale: string[] = [];

        let currentGap = 0;
        scaleBehavior.forEach((gap) => {
            notesInScale.push(chromaticScale[currentGap]);
            currentGap += gap;
        });

        notesInScale = this.replicateScale(notesInScale);

        const startingNote = notesInScale[degree - 1];
        currentGap = 0;
        notesInScale = [];

        const behaviorDegree = [
            ...scaleBehavior.slice(degree - 1),
            ...scaleBehavior.slice(0, degree - 1)
        ];

        behaviorDegree.forEach((gap) => {
            const note = this.increment(startingNote, currentGap);
            notesInScale.push(note);
            currentGap += gap;
        });

        return this.replicateScale(notesInScale);
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

    private replicateScale(notes: string[]): string[] {
        const result = [...notes];
        let currNotes = [...notes];
        for (let i = 1; i < 4; i++) {
            currNotes = currNotes.map((e) => {
                const n = e.slice(0, -1);
                const oct = Number(e.slice(-1));
                return `${n}${oct + 1}`;
            });
            result.push(...currNotes);
        }
        return result;
    }
}
