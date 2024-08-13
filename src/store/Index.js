import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

// 後台
import bePage from '@/store/backend/page/Index.js';
import beUser from '@/store/backend/user/Index.js';

// 前台
import feProduct from '@/store/frontend/product/Index.js';

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules: {
        // 後台
        bePage: bePage, // 分頁
        beUser: beUser, // 使用者

        // 前台
        feProduct: feProduct, // 商品
    },
});

export default store;