import { RouteRecordRaw } from 'vue-router';

const PomoSettings = () =>
    import('@/primary/components/ecossystems/PomoSettings.vue');
const PomoSession = () =>
    import('@/primary/components/ecossystems/PomoSession.vue');

export enum HomeView {
    session = 'POMO_SESSION',
    settings = 'POMO_SETTINGS'
}

export const homeViews: RouteRecordRaw[] = [
    {
        name: HomeView.session,
        component: PomoSession,
        path: '/session'
    },
    {
        name: HomeView.settings,
        component: PomoSettings,
        path: '/'
    }
];
