const router = {
    path: 'shop',
    children: [
        {
            path: '',
            component: () => import('@/components/shop/layout/default/Index.vue'),
        },
    ],
}

export default router;