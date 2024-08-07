const router = {
    path: 'shop',
    children: [
        {
            path: '',
            meta: {
                title: 'COORD',
            },
            component: () => import('@/components/shop/layout/default/Index.vue'),
            children: [
                {
                    path: '',
                    name: 'shopHome',
                    component: () => import('@/components/shop/home/Index.vue'),
                },
            ],
        },
    ],
}

export default router;