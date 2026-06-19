import { computed, watchEffect } from 'vue';
import { usePreferencesStore } from '../store/preferencesStore';

const audio = new Audio('/audio/alarm.mp3');
let pendingAlarm = false;

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && pendingAlarm) {
        pendingAlarm = false;
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
});

export const useAlarm = () => {
    const preferencesStore = usePreferencesStore();

    const isMuted = computed(() => preferencesStore.alarmVolume === 0);

    const playAlarm = () => {
        audio.currentTime = 0;
        audio.play().catch(() => {
            pendingAlarm = true;
        });
    };

    const stopAlarm = () => {
        pendingAlarm = false;
        audio.pause();
        audio.currentTime = 0;
    };

    const muteAlarm = () => {
        preferencesStore.alarmVolume = 0;
    };

    const unmuteAlarm = () => {
        preferencesStore.alarmVolume = 0.5;
    };

    const toggleAlarmVolume = () => {
        isMuted.value ? unmuteAlarm() : muteAlarm();
    };

    watchEffect(() => {
        audio.volume = preferencesStore.alarmVolume;
    });

    return {
        isMuted,
        muteAlarm,
        unmuteAlarm,
        toggleAlarmVolume,
        playAlarm,
        stopAlarm
    };
};
