const router = {
    path: 'cart',
    name: 'shopCart',
    meta: {
        title: '購物車',
    },
    component: () => import('@/components/shop/cart/Index.vue'),
};

export default router;