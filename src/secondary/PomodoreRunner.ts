import { Pomodore } from '@/domain/Pomodore';
import { addMinutes } from './utils/date-utils';

export class PomodoreRunner {
    private _timeLeft = -1;
    private callbacks: (() => void)[] = [];

    private finalDate?: number;

    constructor(private pomodore: Pomodore) {}

    get timeLeft() {
        return this._timeLeft;
    }

    start() {
        this.finalDate = addMinutes(
            new Date(),
            this.pomodore.workSessionLength
        ).getTime();

        setInterval(() => {
            if (!this.finalDate) {
                return;
            }
            this._timeLeft = this.finalDate - Date.now();
        }, 1000);
    }

    onFinish(callback: () => void) {
        this.callbacks.push(callback);
    }
}
