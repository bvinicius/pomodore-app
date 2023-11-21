/**
 * Transform an input that represents the number of seconds into the format MM:SS
 * @param seconds the duration, in seconds.
 * @returns string
 */
export const toMinuteFormat = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);

    const strMinutes = minutes.toFixed(0).padStart(2, '0');

    const sec = seconds % 60;

    const strSec = sec.toFixed(0).padStart(2, '0');

    return `${strMinutes}:${strSec}`;
};
