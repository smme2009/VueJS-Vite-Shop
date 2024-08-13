import * as apiProduct from "@/api/shop/product/Product.js";
import * as toolNotify from "@/tool/Notify.js";
import * as toolStr from "@/tool/Str.js";

const module = {
    namespaced: true,
    state: {
        page: 0,
        data: [],
        load: true,
    },
    mutations: {
        /**
         * 設定頁碼
         * 
         * @param {int} page 頁碼
         * 
         * @returns {void} 
         */
        setPage(state, page) {
            state.page = page;
        },

        /**
        * 新增頁面資料
        * 
        * @param {array} data 頁面資料
        * 
        * @returns {void} 
        */
        addData(state, data) {
            state.data = [...state.data, ...data];
        },

        /**
         * 設定讀取狀態
         * 
         * @param {bool} status 狀態
         * 
         * @returns {void} 
         */
        setLoadStatus(state, status) {
            state.load = status;
        },

        /**
         * 重設狀態
         * 
         * @returns {void} 
         */
        reSetState(state) {
            state.page = 0;
            state.data = [];
            state.load = true;
        },
    },
    actions: {
        /**
         * 到下一頁
         *
         * @returns {void}
         */
        async toNextPage({ commit, state }) {
            commit('setLoadStatus', true);

            const nextPage = state.page + 1;
            const response = await apiProduct.getProductPage(nextPage);

            if (response.status === false) {
                toolNotify.error("通知", response.message);

                return;
            }

            const productPage = response.data.productPage.data;

            if (productPage.length <= 0) {
                commit('setLoadStatus', false);

                return;
            }

            // 設定商品資料
            const data = [];
            productPage.forEach((item) => {
                data.push({
                    productId: item.productId,
                    photoUrl: item.photoUrl,
                    name: item.name,
                    price: toolStr.formatNumber(item.price),
                    quantity: item.quantity,
                    description: item.description,
                });
            });

            commit('setPage', nextPage);
            commit('addData', data);
            commit('setLoadStatus', false);
        },
    },
};

export default module;