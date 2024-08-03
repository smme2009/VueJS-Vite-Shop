const router = {
    path: 'home',
    name: 'mgmtHome',
    meta: {
        title: '首頁',
        isHome: true,
    },
    component: () => import('@/components/mgmt/home/Index.vue'),
};

export default router;