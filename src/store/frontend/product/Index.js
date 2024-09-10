import { defineStore } from 'pinia';
import * as apiProduct from "@/api/shop/product/Product.js";
import toolNotify from "@/tool/Notify.js";
import * as toolStr from "@/tool/Str.js";

// Store名稱
const name = 'feProduct';

// Store設定
const option = {
    state: () => ({
        load: true,
        page: 0,
        keyword: '',
        productTypeId: null,
        data: [],
    }),
    actions: {
        /**
         * 搜尋商品
         * 
         * @returns {void}  
         */
        searchProduct() {
            this.page = 0;
            this.data = [];

            this.getNextPage();
        },

        /**
         * 取得下一頁
         * 
         * @return {void}
         */
        async getNextPage() {
            this.load = true;

            const page = this.page + 1;

            const searchData = {
                keyword: this.keyword,
                productTypeId: this.productTypeId,
            };

            const response = await apiProduct.getProductPage(page, searchData);

            if (response.status === false) {
                toolNotify({
                    type: "error",
                    title: "通知",
                    message: response.message,
                });

                return;
            }

            const productPage = response.data.productPage.data;

            if (productPage.length === 0) {
                this.load = false;

                return;
            }

            // 設定商品資料
            productPage.forEach((item) => {
                this.data.push({
                    productId: item.productId,
                    photoUrl: item.photoUrl,
                    name: item.name,
                    price: toolStr.formatNumber(item.price),
                    quantity: item.quantity,
                    description: item.description,
                });
            });

            this.page = page;
            this.load = false;
        },
    },
};

const store = defineStore(name, option);

export default store;