import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const PomoSettings = () =>
    import('@/primary/components/ecossystems/PomoSettings.vue');
const PomoSession = () =>
    import('@/primary/components/ecossystems/PomoSession.vue');

export enum RootPage {
    settings = 'SETTINGS_PAGE',
    session = 'SESSION_PAGE'
}

export const routes: RouteRecordRaw[] = [
    {
        component: PomoSettings,
        name: RootPage.settings,
        path: '/'
    },
    {
        component: PomoSession,
        name: RootPage.session,
        path: '/session'
    }
];

const router = createRouter({ routes, history: createWebHashHistory() });

export default router;
