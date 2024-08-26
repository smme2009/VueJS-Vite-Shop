const router = {
    path: 'register',
    name: 'shopRegister',
    meta: {
        title: '註冊',
    },
    component: () => import('@/components/shop/member/register/Index.vue'),
};

export default router;