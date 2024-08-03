const router = {
    path: 'login',
    name: 'mgmtLogin',
    meta: {
        title: '登入',
    },
    component: () => import('@/components/mgmt/user/login/Index.vue'),
};

export default router;