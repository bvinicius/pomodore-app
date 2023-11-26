import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const HomePage = () => import('@/primary/pages/HomePage.vue');
const SessionPage = () => import('@/primary/pages/SessionPage.vue');

export enum RootPage {
    home = 'HOME_PAGE',
    session = 'SESSION_PAGE'
}

export const routes: RouteRecordRaw[] = [
    {
        component: HomePage,
        name: RootPage.home,
        path: '/'
    },
    {
        component: SessionPage,
        name: RootPage.session,
        path: '/session'
    }
];

const router = createRouter({ routes, history: createWebHashHistory() });

export default router;
