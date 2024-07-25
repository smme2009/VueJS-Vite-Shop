import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            component: () => import('@/App.vue'),
            children: [
                {
                    path: 'account',
                    component: () => import('@/components/layout/default/Index.vue'),
                    children: [
                        {
                            path: 'login',
                            meta: {
                                title: '登入',
                            },
                            component: () => import('@/components/account/login/Index.vue'),
                        },
                    ],
                },
                {
                    path: 'mgmt',
                    component: () => import('@/components/layout/admin/Index.vue'),
                    children: [
                        {
                            path: 'home',
                            meta: {
                                title: '首頁',
                                isHome: true,
                            },
                            component: () => import('@/components/home/Index.vue'),
                        },
                        {
                            path: 'product',
                            meta: {
                                title: '商品管理',
                            },
                            children: [
                                {
                                    path: '',
                                    component: () => import('@/components/product/list/Index.vue'),
                                },
                                {
                                    path: 'add',
                                    meta: {
                                        title: '新增商品',
                                    },
                                    component: () => import('@/components/product/form/Index.vue'),
                                },
                                {
                                    path: 'edit/:productId',
                                    meta: {
                                        title: '編輯商品',
                                    },
                                    component: () => import('@/components/product/form/Index.vue'),
                                },
                                {
                                    path: 'stock/:productId',
                                    meta: {
                                        title: '庫存單管理',
                                    },
                                    children: [
                                        {
                                            path: '',
                                            component: () => import('@/components/productStock/list/Index.vue'),
                                        },
                                        {
                                            path: 'add',
                                            meta: {
                                                title: '新增庫存單',
                                            },
                                            component: () => import('@/components/productStock/form/Index.vue'),
                                        },
                                    ]
                                },
                            ],
                        },
                        {
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
                        },
                    ],
                },
            ],
        },
    ],
});

// 跳轉前動作
router.beforeEach((to, from, next) => {
    // 設定系統標題
    document.title = to.meta.title;

    next();
});

export default router;