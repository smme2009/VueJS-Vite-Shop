const router = {
    path: 'order',
    meta: {
        title: '訂單',
    },
    children: [
        {
            path: '',
            name: 'shopOrder',
            meta: {
                title: '新增訂單',
            },
            component: () => import('@/components/shop/order/add/Index.vue'),
        },
        {
            path: 'list',
            name: 'shopOrderList',
            meta: {
                title: '訂單管理',
            },
            component: () => import('@/components/shop/order/list/Index.vue'),
        },
    ],

};

export default router;