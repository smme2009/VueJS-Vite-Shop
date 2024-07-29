import { createStore } from 'vuex';

import page from '@/store/page/Index.js';

const store = createStore({
    modules: {
        page: page, // 分頁
    },
});

export default store;