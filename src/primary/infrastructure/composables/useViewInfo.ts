import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { HomeView } from '../router/homeViews';

export const useViewInfo = () => {
    const router = useRouter();

    const isSessionView = computed(
        () => router.currentRoute.value.name === HomeView.session
    );

    const isSettingsView = computed(
        () => router.currentRoute.value.name === HomeView.settings
    );

    return {
        isSessionView,
        isSettingsView
    };
};
