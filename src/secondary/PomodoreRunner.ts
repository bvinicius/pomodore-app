import { PomoSettings, PomoSessionType } from '@/domain/Pomodore';
import EventEmitter from 'events';

enum PomoRunnerEvent {
    SESSION_END = 'session-end',
    SESSION_START = 'session-start',
    TICK = 'tick'
}

export class PomoRunner {
    private readonly eventEmitter = new EventEmitter();
    private currentSession?: PomoSessionType;
    private _isPaused = false;
    private _started = false;

    constructor(private pomodore: PomoSettings) {}

    private get currentSessionLength() {
        if (!this.currentSession) {
            return 0;
        }
        return this.currentSession === PomoSessionType.WORK
            ? this.pomodore.workSessionLength
            : this.pomodore.breakSessionLength;
    }

    get isPaused() {
        return this._isPaused;
    }

    get started() {
        return this._started;
    }

    onSessionStart(cb: (session: PomoSessionType) => void) {
        this.eventEmitter.on(PomoRunnerEvent.SESSION_START, cb);
    }

    onSessionEnd(cb: (endedSession: PomoSessionType) => void) {
        this.eventEmitter.on(PomoRunnerEvent.SESSION_END, cb);
    }

    onTick(cb: (secondsLeft: number) => void) {
        this.eventEmitter.on(PomoRunnerEvent.TICK, cb);
    }

    pause() {
        this._isPaused = true;
    }

    resume() {
        this._isPaused = false;
    }

    startNextSession() {
        this._started = true;
        this.skipSession();
        this.startSessionCountdown();
    }

    private skipSession() {
        if (!this.currentSession) {
            this.currentSession = PomoSessionType.WORK;
            return;
        }

        this.currentSession =
            this.currentSession === PomoSessionType.BREAK
                ? PomoSessionType.WORK
                : PomoSessionType.BREAK;
    }

    private startSessionCountdown() {
        this.emitSessionStart();

        const sessionLengthSeconds = this.currentSessionLength * 60;
        this.emitTick(sessionLengthSeconds);

        let secondsPassed = 0;
        const interval = setInterval(() => {
            if (this._isPaused) return;

            secondsPassed++;

            this.emitTick(sessionLengthSeconds - secondsPassed);

            if (secondsPassed >= sessionLengthSeconds) {
                this.emitSessionEnd();
                clearInterval(interval);
            }
        }, 1000);
    }

    private emitSessionStart() {
        this.eventEmitter.emit(
            PomoRunnerEvent.SESSION_START,
            this.currentSession
        );
    }

    private emitSessionEnd() {
        this.eventEmitter.emit(
            PomoRunnerEvent.SESSION_END,
            this.currentSession
        );
    }

    private emitTick(num: number) {
        this.eventEmitter.emit(PomoRunnerEvent.TICK, num);
    }
}
