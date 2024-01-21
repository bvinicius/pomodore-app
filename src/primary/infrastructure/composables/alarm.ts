import { computed, watchEffect } from 'vue';
import { usePreferencesStore } from '../store/preferencesStore';

const audio = new Audio('/audio/alarm.mp3');

export const useAlarm = () => {
    const preferencesStore = usePreferencesStore();

    const isMuted = computed(() => preferencesStore.alarmVolume === 0);

    const playAlarm = () => {
        console.log('volume', preferencesStore.alarmVolume);

        audio.currentTime = 0;
        audio.play();
    };

    const stopAlarm = () => {
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
