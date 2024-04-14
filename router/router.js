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
                    component: () => import('@/layout/Default.vue'),
                    children: [
                        {
                            path: 'login',
                            name: 'login',
                            title: 'login',
                            component: () => import('@/view/login/Login.vue'),
                        },
                    ],
                },
            ],
        },
    ],
});

export default router;