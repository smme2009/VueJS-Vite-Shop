import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

import page from '@/store/page/Index.js';
import user from '@/store/user/Index.js';

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules: {
        page: page, // 分頁
        user: user, // 使用者
    },
});

export default store;