import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            component: () => import('@/App.vue'),
            children: [
                {
                    path: 'account',
                    component: () => import('@/components/layout/default/Index.vue'),
                    children: [
                        {
                            path: 'login',
                            name: 'login',
                            title: 'login',
                            component: () => import('@/components/account/login/Index.vue'),
                        },
                    ],
                },
                {
                    path: 'mgmt',
                    component: () => import('@/components/layout/admin/Index.vue'),
                },
            ],
        },
    ],
});

export default router;