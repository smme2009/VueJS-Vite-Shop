const router = {
    path: 'login',
    meta: {
        title: '登入',
    },
    component: () => import('@/components/account/login/Index.vue'),
};

export default router;