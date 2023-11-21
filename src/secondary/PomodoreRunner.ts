import { PomoSettings, PomoSessionType } from '@/domain/Pomodore';
import EventEmitter from 'events';

enum PomoRunnerEvent {
    SESSION_END = 'session-end',
    SESSION_START = 'session-start',
    TICK = 'tick'
}

export class PomoRunner {
    private currentSession?: PomoSessionType;

    private readonly eventEmitter = new EventEmitter();

    constructor(private pomodore: PomoSettings) {}

    private get currentSessionLength() {
        if (!this.currentSession) {
            return 0;
        }
        return this.currentSession === PomoSessionType.WORK
            ? this.pomodore.workSessionLength
            : this.pomodore.breakSessionLength;
    }

    startNextSession() {
        this.skipSession();
        this.startSessionCountdown();
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

        let secondsPassed = 0;
        const interval = setInterval(() => {
            const sessionLengthSeconds = this.currentSessionLength * 60;

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
