const router = {
    path: 'order',
    meta: {
        title: '訂單管理',
    },
    children: [
        {
            path: '',
            name: 'mgmtOrder',
            component: () => import('@/components/mgmt/order/list/Index.vue'),
        },
        {
            path: ':orderId/info',
            name: 'mgmtOrderInfo',
            component: () => import('@/components/mgmt/order/info/Index.vue'),
        },
    ],
};

export default router;