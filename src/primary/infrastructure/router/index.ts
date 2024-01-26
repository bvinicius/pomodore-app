import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const HomePage = () => import('@/primary/pages/HomePage.vue');

export enum RootPage {
    home = 'HOME_PAGE',
    multiplayer = 'MULTIPLAYER_PAGE'
}

export const routes: RouteRecordRaw[] = [
    {
        component: HomePage,
        name: RootPage.home,
        path: '/'
    },
    {
        component: HomePage,
        name: RootPage.multiplayer,
        path: '/:id'
    }
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
