import { formatTime } from '@/secondary/utils/date-utils';
import { describe, test, expect } from 'vitest';

describe('date-utils', () => {
    describe('formatTime', () => {
        test('120000 should return the correct amount of time in min:sec', () => {
            const seconds = 120000; //120000 milliseconds
            const expected = '02:00';

            const result = formatTime(seconds);

            expect(result).toEqual(expected);
        });

        test('185000 should return the correct amount of time in min:sec', () => {
            const seconds = 185000; //185000 milliseconds
            const expected = '03:05';

            const result = formatTime(seconds);

            expect(result).toEqual(expected);
        });
    });
});
