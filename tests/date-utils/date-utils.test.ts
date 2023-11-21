import { toMinuteFormat } from '@/secondary/utils/date-utils';
import { describe, test, expect } from 'vitest';

describe('date-utils', () => {
    describe('toMinuteFormat', () => {
        test('120seg should return 02:00', () => {
            const seconds = 120; //120 seconds
            const expected = '02:00';

            const result = toMinuteFormat(seconds);

            expect(result).toEqual(expected);
        });

        test('185seg should return 03:05', () => {
            const seconds = 185; //185 seconds
            const expected = '03:05';

            const result = toMinuteFormat(seconds);

            expect(result).toEqual(expected);
        });

        test('59seg should return 00:59', () => {
            const seconds = 59; //59 seconds
            const expected = '00:59';

            const result = toMinuteFormat(seconds);

            expect(result).toEqual(expected);
        });
    });
});
