import { PomoSessionType } from '@/domain/Pomodore';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { toMinuteFormat } from '@/secondary/utils/date-utils';
import { injectSafe } from '@/primary/infrastructure/dependency-injection';
import { COUNTER_WORKER } from '@/primary/infrastructure/dependency-symbols';

const audio = new Audio('/audio/alarm.mp3');

export const usePomoRunner = () => {
    const pomoStore = usePomoStore();
    const counterWorker = injectSafe<Worker>(COUNTER_WORKER);
    const worker = counterWorker;

    const startNextSession = () => {
        worker.postMessage({ type: 'stop' });
        _skipSession();
        _startSessionCountdown();
    };

    const continueSession = () => {
        if (pomoStore.session.isOver) {
            startNextSession();
            return;
        }

        worker.postMessage({ type: 'stop' });
        _startSessionCountdown();
    };

    const resume = () => {
        worker.postMessage({ type: 'start' });
        pomoStore.session.paused = false;
    };

    const pause = () => {
        worker.postMessage({ type: 'stop' });
        pomoStore.session.paused = true;
    };

    const restartSesion = () => {
        pomoStore.session = {
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
            timeLeft: pomoStore.currentSessionLength * 60,
            isOver: false,
            started: false,
            paused: false,
            current: pomoStore.session.current
        };
        _updateMetaTitle();
        worker.postMessage({ type: 'stop' });
    };

    const _skipSession = () => {
        pomoStore.session.current === PomoSessionType.WORK
            ? (pomoStore.session.current = PomoSessionType.BREAK)
            : (pomoStore.session.current = PomoSessionType.WORK);

        pomoStore.session = {
            timeLeft: pomoStore.currentSessionLength * 60,
            isOver: false,
            started: true,
            paused: false,
            current: pomoStore.session.current
        };
    };

    const _startSessionCountdown = () => {
        _stopAudio();
        _updateMetaTitle();
        pomoStore.session.started = true;

        if (!pomoStore.session.timeLeft || pomoStore.session.timeLeft <= 0) {
            pomoStore.session.timeLeft = pomoStore.currentSessionLength;
        }

        worker.postMessage({ type: 'start' });
        worker.onmessage = (message) => {
            if (message.data.type === 'tick') {
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
            }
        };
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
        worker.postMessage({ type: 'stop' });
        _playAudio();
    };

    const _playAudio = () => {
        audio.currentTime = 0;
        audio.play();
    };

    const _stopAudio = () => {
        audio.pause();
        audio.currentTime = 0;
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
