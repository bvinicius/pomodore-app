import { ref } from 'vue';
import { PomoSessionType } from '@/domain/Pomodore';
import { usePomoStore } from '@/primary/infrastructure/store/pomoStore';
import { toMinuteFormat } from '@/secondary/utils/date-utils';

const interval = ref<NodeJS.Timeout>();

export const usePomoRunner = () => {
    const pomoStore = usePomoStore();

    const startNextSession = () => {
        clearInterval(interval.value);
        _skipSession();
        _startSessionCountdown();
    };

    const continueSession = () => {
        if (pomoStore.session.isOver) {
            startNextSession();
            return;
        }

        clearInterval(interval.value);
        _startSessionCountdown();
    };

    const resume = () => {
        pomoStore.session.paused = false;
    };

    const pause = () => {
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
        clearInterval(interval.value);
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
        _updateMetaTitle();
        pomoStore.session.started = true;

        if (!pomoStore.session.timeLeft || pomoStore.session.timeLeft <= 0) {
            pomoStore.session.timeLeft = pomoStore.currentSessionLength;
        }

        interval.value = setInterval(() => {
            if (pomoStore.session.paused) {
                return;
            }

            pomoStore.session.timeLeft = Math.max(
                pomoStore.session.timeLeft - 1,
                0
            );

            _updateMetaTitle();

            if (pomoStore.session.timeLeft <= 0) {
                pomoStore.session.isOver = true;
                clearInterval(interval.value);
            }
        }, 1000);
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

    return {
        startNextSession,
        continueSession,
        resume,
        pause,
        restartSesion,
        clearSession
    };
};
