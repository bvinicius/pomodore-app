import { describe, expect, test } from 'vitest';
import { MajorScale } from '@/domain/MajorScale';
import { majorScaleFixture } from './fixtures/major-fixtures';

const majorScale: MajorScale | undefined = new MajorScale();

describe('testing major scale', () => {
    test.each(majorScaleFixture)(
        'testing $degree degree chord of $root major scale.',
        async ({ root, degree, expected }) => {
            test('should give the correct chords in each degree of the given scale maj scale', async () => {
                const notes = majorScale?.getNotes(root, degree);
                expect(notes).toEqual(expected);
            });
        }
    );
});
