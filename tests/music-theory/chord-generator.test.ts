import { describe, expect, test } from 'vitest';
import { ChordGenerator } from '@/domain/ChordGenerator';
import { ScaleType } from '@/domain/ScaleType';
import { majorScaleFixture } from './fixtures/chord-fixtures';

const chordGenerator: ChordGenerator | undefined = new ChordGenerator();

describe('testing major scale', () => {
    test.each(majorScaleFixture)(
        'testing $degree degree chord of $root major scale.',
        ({ root, degree, expected }) => {
            const notes = chordGenerator?.getNotes(
                root,
                degree,
                ScaleType.MAJOR
            );
            expect(notes).toEqual(expected);
        }
    );
});
