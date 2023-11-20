import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('@/primary/pages/HomePage.vue');

export const routes: RouteRecordRaw[] = [
    {
        component: HomePage,
        path: '/'
    }
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
