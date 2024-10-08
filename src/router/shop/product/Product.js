const router = {
    path: 'product/:productId',
    name: 'shopProduct',
    meta: {
        title: '商品',
    },
    component: () => import('@/components/shop/product/Index.vue'),
};

export default router;