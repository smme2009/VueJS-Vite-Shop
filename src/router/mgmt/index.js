import login from '@/router/mgmt/user/Login.js';
import home from '@/router/mgmt/home/Home.js';
import product from '@/router/mgmt/product/Product.js';
import productType from '@/router/mgmt/product/ProductType.js';

const router = {
    path: 'mgmt',
    children: [
        {
            path: '',
            component: () => import('@/components/layout/admin/Index.vue'),
            children: [
                home,
                product,
                productType,
            ],
        },
        login,
    ],
}

export default router;