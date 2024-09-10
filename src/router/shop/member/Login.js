const router = {
    path: 'login',
    name: 'shopLogin',
    meta: {
        title: '登入',
    },
    component: () => import('@/components/shop/member/login/Index.vue'),
};

export default router;