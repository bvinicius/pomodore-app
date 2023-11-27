import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { homeViews } from '@/primary/infrastructure/router/homeViews';

const HomePage = () => import('@/primary/pages/HomePage.vue');
const StoragePage = () => import('@/primary/pages/StoragePage.vue');

export enum RootPage {
    home = 'HOME_PAGE',
    storage = 'STORAGE_PAGE'
}

export const routes: RouteRecordRaw[] = [
    {
        component: HomePage,
        name: RootPage.home,
        path: '/',
        children: homeViews
    },
    {
        component: StoragePage,
        name: RootPage.storage,
        path: '/storage'
    }
];

const router = createRouter({ routes, history: createWebHashHistory() });

export default router;
