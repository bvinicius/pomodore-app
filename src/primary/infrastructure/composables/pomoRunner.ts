import { ref } from 'vue';
import { usePomoStore } from '../store/pomoStore';
import { PomoSessionType } from '@/domain/Pomodore';

const interval = ref<NodeJS.Timeout>();

export const usePomoRunner = () => {
    const pomoStore = usePomoStore();

    const startNextSession = () => {
        console.log('startNextSession');
        clearInterval(interval.value);
        skipSession();
        startSessionCountdown();
    };

    const continueSession = () => {
        console.log('continueSession');

        clearInterval(interval.value);
        pomoStore.session.started = true;
        startSessionCountdown();
    };

    const skipSession = () => {
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

    const startSessionCountdown = () => {
        console.log('startSessionCountdown');
        if (!pomoStore.session.timeLeft) {
            pomoStore.session.timeLeft = pomoStore.currentSessionLength;
        }

        interval.value = setInterval(() => {
            if (pomoStore.session.timeLeft) {
                pomoStore.session.timeLeft--;
            }

            if (pomoStore.session.timeLeft === 0) {
                pomoStore.session.isOver = true;
                clearInterval(interval.value);
            }
        }, 1000);
    };

    const resume = () => {
        pomoStore.session.paused = false;
    };

    const pause = () => {
        pomoStore.session.paused = true;
    };

    return { startNextSession, continueSession, resume, pause };
};
