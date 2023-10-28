import { describe, expect, test } from 'vitest';
import { ChordGenerator } from '@/domain/ChordGenerator';
import { majorScaleFixture } from './fixtures/major-fixtures';
import { ScaleType } from '@/domain/ScaleType';

const chordGenerator: ChordGenerator | undefined = new ChordGenerator();

describe('testing major scale', () => {
    test.each(majorScaleFixture)(
        'testing $degree degree chord of $root major scale.',
        async ({ root, degree, expected }) => {
            test('should give the correct chords in each degree of the given scale maj scale', async () => {
                const notes = chordGenerator?.getNotes(
                    root,
                    degree,
                    ScaleType.MAJOR
                );
                expect(notes).toEqual(expected);
            });
        }
    );
});
