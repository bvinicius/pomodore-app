import { ScaleType } from '@/domain/ScaleType';
import { isDegreeMinor } from '@/secondary/utils/music-utils';
import { expect, test, describe } from 'vitest';
import { majorScaleFixtureExpected } from './fixtures/music-utils-fixtures';

describe('music-utils', () => {
    test.each(majorScaleFixtureExpected)(
        'isDegreeMinor -> Degree $degree in MAJOR scale',
        ({ degree, expected }) => {
            const scale = ScaleType.MAJOR;
            expect(isDegreeMinor(degree, scale)).toBe(expected);
        }
    );
});
