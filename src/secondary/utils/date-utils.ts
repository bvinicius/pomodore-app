export const formatTime = (millisseconds: number) => {
    const seconds = millisseconds / 1000;
    const minutes = Math.floor(seconds / 60);

    const strMinutes = minutes.toFixed(0).padStart(2, '0');

    const sec = seconds % 60;

    const strSec = sec.toFixed(0).padStart(2, '0');

    return `${strMinutes}:${strSec}`;
};

export const addMinutes = (date: Date, minutes: number): Date => {
    const dt = new Date(date);
    dt.setMinutes(date.getMinutes() + minutes);
    return dt;
};
