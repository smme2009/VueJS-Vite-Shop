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
                            children: [
                                {
                                    path: '',
                                    meta: {
                                        title: '商品管理',
                                    },
                                    component: () => import('@/components/product/list/Index.vue'),
                                },
                                {
                                    path: 'add',
                                    meta: {
                                        title: '新增商品',
                                    },
                                    component: () => import('@/components/product/form/Index.vue'),
                                },
                            ],
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