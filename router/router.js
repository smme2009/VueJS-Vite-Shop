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
                            meta: {
                                title: '登入',
                            },
                            component: () => import('@/components/account/login/Index.vue'),
                        },
                    ],
                },
                {
                    path: 'mgmt',
                    component: () => import('@/components/layout/admin/Index.vue'),
                    children: [
                        {
                            path: 'home',
                            meta: {
                                title: '首頁',
                            },
                            component: () => import('@/components/home/Index.vue'),
                        },
                    ],
                },
            ],
        },
    ],
});

export default router;