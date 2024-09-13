const router = {
    path: 'order',
    name: 'shopOrder',
    meta: {
        title: '訂單',
    },
    component: () => import('@/components/shop/order/Index.vue'),
};

export default router;