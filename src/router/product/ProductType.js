const router = {
    path: 'product/type',
    meta: {
        title: '商品類型管理',
    },
    children: [
        {
            path: '',
            name: 'mgmtProductType',
            component: () => import('@/components/product/productType/list/Index.vue'),
        },
        {
            path: 'add',
            name: 'mgmtProductTypeAdd',
            meta: {
                title: '新增商品類型',
            },
            component: () => import('@/components/product/productType/form/Index.vue'),
        },
        {
            path: 'edit/:productTypeId',
            name: 'mgmtProductTypeEdit',
            meta: {
                title: '編輯商品類型',
            },
            component: () => import('@/components/product/productType/form/Index.vue'),
        },
    ]
};

export default router;