const router = {
    path: 'login',
    meta: {
        title: '登入',
    },
    component: () => import('@/components/user/login/Index.vue'),
};

export default router;