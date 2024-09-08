import { defineStore } from 'pinia';
import * as apiCart from "@/api/shop/cart/Cart.js";
import toolNotify from "@/tool/Notify.js";

// Store名稱
const name = 'feCart';

// Store設定
const option = {
    persist: true,
    state: () => ({
        memberData: [],
        localData: [],
    }),
    getters: {
        /**
         * 本地購物車商品數量
         * 
         * @returns {int} 
         */
        localQuantity(state) {
            const quantity = state.localData.length;

            return quantity;
        },

        /**
         * 會員購物車商品數量
         * 
         * @returns {int} 
         */
        memberQuantity(state) {
            const quantity = state.memberData.length;

            return quantity;
        },
    },
    actions: {
        /**
         * 取得會員購物車列表
         * 
         * @returns {bool}
         */
        async getMemberCartProductList() {
            const response = await apiCart.getCartProductList();

            if (response.status === false) {
                toolNotify({
                    type: "error",
                    title: "通知",
                    message: response.message,
                });

                return false;
            }

            this.memberData = [];
            response.data.cartProductList.forEach(cart => {
                this.memberData.push({
                    cartId: cart.cartId,
                    quantity: cart.quantity,
                    productId: cart.productId,
                    productName: cart.productName,
                    productPhotoUrl: cart.productPhotoUrl,
                    productPrice: cart.productPrice,
                    productQuantity: cart.productQuantity,
                    productSataus: cart.productSataus,
                });
            });

            return true;
        },

        /**
        * 編輯本地購物車商品
        * 
        * @param {object} param 參數
        * @param {int} param.productId 商品ID
        * @param {int} param.quantity 數量
        * 
        * @returns {void}
        */
        editLocalCartProduct(param) {
            let index = null;
            for (let i = 0; i < this.localQuantity; i++) {
                const productId = this.localData[i].productId;
                const hasProduct = (productId === param.productId);

                if (hasProduct) {
                    index = i;
                    break;
                }
            }

            if (index !== null) {
                this.localData[index] = param;
            } else {
                this.localData.push(param);
            }

            toolNotify({
                type: "success",
                title: "通知",
                message: "成功加入購物車",
            });
        },

        /**
         * 編輯會員購物車商品
         * 
         * @param {array|object} param 參數
         * 
         * @returns {bool}
         */
        async editMemberCartProduct(param) {
            const data = Array.isArray(param) ? param : [param];

            const response = await apiCart.editCartProduct(data);

            if (response.status === false) {
                toolNotify({
                    type: "error",
                    title: "通知",
                    message: response.message,
                });

                return false;
            }

            toolNotify({
                type: "success",
                title: "通知",
                message: "成功加入購物車",
            });

            const isGet = await this.getMemberCartProductList();

            return isGet;
        },

        /**
         * 編輯會員購物車商品(透過本地購物車資料)
         * 
         * @returns {void}
         */
        async editMemberCartProductFormLocal() {
            if (this.localData.length <= 0) {
                return;
            }

            const isEdit = await this.editMemberCartProduct(this.localData);

            if (isEdit === false) {
                return
            }

            this.localData = [];
        },

        /**
         * 刪除購物車商品
         * 
         * @param {int} index 索引
         * 
         * @returns {void}
         */
        deleteCartProduct(index) {
            this.localData.splice(index, 1);
        },

        /**
         * 刪除會員購物車商品
         * 
         * @param {int|array} cartId 購物車ID
         * 
         * @returns {bool}
         */
        async deleteMemberCartProduct(cartId) {
            const data = Number.isInteger(cartId) ? [cartId] : cartId;

            const response = await apiCart.deleteCartProduct(data);

            if (response.status === false) {
                toolNotify({
                    type: "error",
                    title: "通知",
                    message: response.message,
                });

                return false;
            }

            toolNotify({
                type: "success",
                title: "通知",
                message: response.message,
            });

            const isGet = this.getMemberCartProductList();

            return isGet;
        }
    },
};

const store = defineStore(name, option);

export default store;