import { PomoCounter } from '@/domain/PomoCounter';
import { PomoSessionType } from '@/domain/Pomodore';

import { useAlarm } from '@/primary/infrastructure/composables/alarm';
import { injectSafe } from '@/primary/infrastructure/dependency-injection';
import { POMO_COUNTER } from '@/primary/infrastructure/dependency-symbols';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';

import { toMinuteFormat } from '@/secondary/utils/date-utils';

export const usePomoRunner = () => {
    const { stopAlarm, playAlarm } = useAlarm();
    const pomoStore = usePomoStore();
    const pomoCounter = injectSafe<PomoCounter>(POMO_COUNTER);

    const startNextSession = () => {
        pomoCounter.stop();
        _skipSession();
        _startSessionCountdown();
    };

    const continueSession = () => {
        if (pomoStore.session.isOver) {
            startNextSession();
            return;
        }

        pomoCounter.stop();
        _startSessionCountdown();
    };

    const resume = () => {
        pomoCounter.start();
        pomoStore.session.paused = false;
    };

    const pause = () => {
        pomoCounter.stop();
        pomoStore.session.paused = true;
    };

    const restartSesion = () => {
        pomoStore.session = {
            id: pomoStore.session.id + 1,
            current: pomoStore.session.current,
            isOver: false,
            paused: false,
            started: true,
            timeLeft: pomoStore.currentSessionLength * 60
        };

        continueSession();
    };

    const clearSession = () => {
        pomoStore.session = {
            id: pomoStore.session.id + 1,
            timeLeft: pomoStore.currentSessionLength * 60,
            isOver: false,
            started: false,
            paused: false,
            current: pomoStore.session.current
        };
        _updateMetaTitle();
        pomoCounter.stop();
    };

    const _skipSession = () => {
        pomoStore.session.current === PomoSessionType.WORK
            ? (pomoStore.session.current = PomoSessionType.BREAK)
            : (pomoStore.session.current = PomoSessionType.WORK);

        pomoStore.session = {
            id: pomoStore.session.id + 1,
            timeLeft: pomoStore.currentSessionLength * 60,
            isOver: false,
            started: true,
            paused: false,
            current: pomoStore.session.current
        };
    };

    const _startSessionCountdown = () => {
        stopAlarm();
        _updateMetaTitle();
        pomoStore.session.started = true;

        if (!pomoStore.session.timeLeft || pomoStore.session.timeLeft <= 0) {
            pomoStore.session.timeLeft = pomoStore.currentSessionLength;
        }

        pomoCounter.start();
        pomoCounter.onTick(_onTick);
    };

    const _updateMetaTitle = () => {
        if (!pomoStore.session.started) {
            document.title = `Pomodore`;
            return;
        }

        const session =
            pomoStore.session.current === PomoSessionType.WORK
                ? 'Work session'
                : 'Break session';

        document.title = `${toMinuteFormat(
            pomoStore.session.timeLeft
        )} - ${session} | Pomodore`;
    };

    const _onSessionEnd = () => {
        pomoStore.session.isOver = true;
        pomoCounter.stop();
        playAlarm();
    };

    const _onTick = () => {
        if (pomoStore.session.paused) {
            return;
        }

        pomoStore.session.timeLeft = Math.max(
            pomoStore.session.timeLeft - 1,
            0
        );

        _updateMetaTitle();

        if (pomoStore.session.timeLeft <= 0) {
            _onSessionEnd();
        }
    };

    return {
        startNextSession,
        continueSession,
        resume,
        pause,
        restartSesion,
        clearSession
    };
};
