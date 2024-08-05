const router = {
    path: 'banner',
    meta: {
        title: '橫幅管理',
    },
    children: [
        {
            path: '',
            name: 'mgmtBanner',
            component: () => import('@/components/mgmt/banner/list/Index.vue'),
        },
        {
            path: 'add',
            name: 'mgmtBannerAdd',
            meta: {
                title: '新增橫幅',
            },
            component: () => import('@/components/mgmt/banner/form/Index.vue'),
        },
        {
            path: 'edit/:bannerId',
            name: 'mgmtBannerEdit',
            meta: {
                title: '編輯橫幅',
            },
            component: () => import('@/components/mgmt/banner/form/Index.vue'),
        },
    ],
};

export default router;