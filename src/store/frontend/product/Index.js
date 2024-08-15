import * as apiProduct from "@/api/shop/product/Product.js";
import * as toolNotify from "@/tool/Notify.js";
import * as toolStr from "@/tool/Str.js";

const module = {
    namespaced: true,
    state: {
        page: 0,
        productTypeId: null,
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
        * 設定頁面資料
        * 
        * @param {array} data 頁面資料
        * 
        * @returns {void} 
        */
        setData(state, data) {
            state.data = data;
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
         * 設定商品類型ID
         * 
         * @param {int} productTypeId 商品類型ID
         * 
         * @returns {void} 
         */
        setProductTypeId(state, productTypeId) {
            state.productTypeId = productTypeId;
        },

        /**
         * 重設狀態
         * 
         * @returns {void} 
         */
        reSetState(state) {
            state.page = 0;
            state.productTypeId = null;
            state.data = [];
            state.load = true;
        },
    },
    actions: {
        /**
         * 設定商品類型ID
         * 
         * @param {int} productTypeId 商品類型ID
         * 
         * @returns {void}  
         */
        async setProductTypeId({ commit, state }, productTypeId) {
            commit('setLoadStatus', true);
            commit('setProductTypeId', productTypeId);

            const searchData = {
                productTypeId: state.productTypeId,
            };

            const page = 1;
            const productPage = await getProductPage(page, searchData);

            commit('setPage', page);
            commit('setData', productPage);
            commit('setLoadStatus', false);
        },

        /**
         * 到下一頁
         *
         * @returns {void}
         */
        async toNextPage({ commit, state }) {
            commit('setLoadStatus', true);

            const searchData = {
                productTypeId: state.productTypeId,
            };

            const page = state.page + 1;
            let productPage = await getProductPage(page, searchData);

            if (productPage.length === 0) {
                commit('setLoadStatus', false);

                return;
            }

            productPage = [...state.data, ...productPage];

            commit('setPage', page);
            commit('setData', productPage);
            commit('setLoadStatus', false);
        },
    },
};

/**
 * 取得商品分頁
 * 
 * @param {int} page 頁碼
 * @param {object} searchData 搜尋資料
 * 
 * @returns {array} 
 */
const getProductPage = async (page, searchData) => {
    const response = await apiProduct.getProductPage(page, searchData);

    if (response.status === false) {
        toolNotify.error("通知", response.message);

        return [];
    }

    const data = response.data.productPage.data;

    // 設定商品資料
    const productPage = [];
    data.forEach((item) => {
        productPage.push({
            productId: item.productId,
            photoUrl: item.photoUrl,
            name: item.name,
            price: toolStr.formatNumber(item.price),
            quantity: item.quantity,
            description: item.description,
        });
    });

    return productPage;
};

export default module;