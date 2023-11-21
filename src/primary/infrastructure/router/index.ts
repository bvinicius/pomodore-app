import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('@/primary/pages/HomePage.vue');
const StoragePage = () => import('@/primary/pages/StoragePage.vue');
export const routes: RouteRecordRaw[] = [
    {
        component: HomePage,
        path: '/'
    },
    {
        component: StoragePage,
        path: '/storage'
    }
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
