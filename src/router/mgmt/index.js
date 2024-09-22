import Login from '@/router/mgmt/admin/Login.js';
import Home from '@/router/mgmt/home/Home.js';
import Product from '@/router/mgmt/product/Product.js';
import ProductType from '@/router/mgmt/product/ProductType.js';
import Banner from '@/router/mgmt/banner/Banner.js';
import Order from '@/router/mgmt/order/Order.js';

const router = {
    path: 'mgmt',
    children: [
        Login,
        {
            path: '',
            component: () => import('@/components/mgmt/layout/admin/Index.vue'),
            children: [
                Home,
                Product,
                ProductType,
                Banner,
                Order,
            ],
        },
    ],
}

export default router;