import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

import page from '@/store/backend/page/Index.js';
import user from '@/store/backend/user/Index.js';

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules: {
        bePage: page, // 分頁
        beUser: user, // 使用者
    },
});

export default store;