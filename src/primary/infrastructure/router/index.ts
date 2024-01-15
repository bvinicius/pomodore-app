import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const HomePage = () => import('@/primary/pages/HomePage.vue');

export enum RootPage {
    home = 'HOME_PAGE'
}

export const routes: RouteRecordRaw[] = [
    {
        component: HomePage,
        name: RootPage.home,
        path: '/'
    }
];

const router = createRouter({ routes, history: createWebHashHistory() });

export default router;
