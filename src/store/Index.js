import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

import page from '@/store/page/Index.js';

const store = createStore({
    plugins: [
        createPersistedState()
    ],
    modules: {
        page: page, // 分頁
    },
});

export default store;