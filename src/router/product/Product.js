const router = {
    path: 'product',
    meta: {
        title: '商品管理',
    },
    children: [
        {
            path: '',
            component: () => import('@/components/product/product/list/Index.vue'),
        },
        {
            path: 'add',
            meta: {
                title: '新增商品',
            },
            component: () => import('@/components/product/product/form/Index.vue'),
        },
        {
            path: 'edit/:productId',
            meta: {
                title: '編輯商品',
            },
            component: () => import('@/components/product/product/form/Index.vue'),
        },
        {
            path: 'stock/:productId',
            meta: {
                title: '庫存單管理',
            },
            children: [
                {
                    path: '',
                    component: () => import('@/components/product/productStock/list/Index.vue'),
                },
                {
                    path: 'add',
                    meta: {
                        title: '新增庫存單',
                    },
                    component: () => import('@/components/product/productStock/form/Index.vue'),
                },
            ]
        },
    ],
};

export default router;