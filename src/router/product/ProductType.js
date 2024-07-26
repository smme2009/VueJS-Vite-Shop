const router = {
    path: 'product/type',
    meta: {
        title: '商品類型管理',
    },
    children: [
        {
            path: '',
            component: () => import('@/components/productType/list/Index.vue'),
        },
        {
            path: 'add',
            meta: {
                title: '新增商品類型',
            },
            component: () => import('@/components/productType/form/Index.vue'),
        },
        {
            path: 'edit/:productTypeId',
            meta: {
                title: '編輯商品類型',
            },
            component: () => import('@/components/productType/form/Index.vue'),
        },
    ]
};

export default router;