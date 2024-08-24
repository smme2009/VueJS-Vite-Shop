import Login from '@/router/shop/member/Login.js';

const router = {
    path: 'shop',
    children: [
        {
            path: '',
            meta: {
                title: 'COORD',
            },

            children: [
                {
                    path: '',
                    component: () => import('@/components/shop/layout/default/Index.vue'),
                    children: [
                        Login,
                    ],
                },
                {
                    path: '',
                    component: () => import('@/components/shop/layout/shop/Index.vue'),
                    children: [
                        {
                            path: 'home',
                            name: 'shopHome',
                            component: () => import('@/components/shop/home/Index.vue'),
                        },
                    ],
                },
            ],
        },
    ],
}

export default router;