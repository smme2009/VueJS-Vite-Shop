import { createRouter, createWebHistory } from 'vue-router';

import login from '@/router/user/Login.js';
import home from '@/router/home/Home.js';
import product from '@/router/product/Product.js';
import productType from '@/router/product/ProductType.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            component: () => import('@/App.vue'),
            children: [
                {
                    path: 'mgmt',
                    children: [
                        login,
                        {
                            path: '',
                            component: () => import('@/components/layout/admin/Index.vue'),
                            children: [
                                home,
                                product,
                                productType,
                            ],
                        }
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