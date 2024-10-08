import { createRouter, createWebHistory } from 'vue-router';

import mgmt from '@/router/mgmt/Index.js';
import shop from '@/router/shop/Index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            component: () => import('@/App.vue'),
            children: [
                shop,
                mgmt,
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