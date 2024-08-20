import { defineStore } from 'pinia';
import { login as apiLogin } from "@/api/mgmt/admin/Login.js";
import { error as notifyError, success as notifySuccess } from "@/tool/Notify.js";

// Store名稱
const name = 'beAdmin';

// Store設定
const option = {
    persist: true,
    state: () => ({
        jwtToken: '',
    }),
    actions: {
        /**
         * 設定JWT Token
         * 
         * @param {string} account 帳號
         * @param {string} password 密碼
         * 
         * @returns {bool} 
         */
        async setJwtToken(account, password) {
            this.$reset;

            const response = await apiLogin(account, password);

            if (response.status === false) {
                notifyError("通知", response.message, false);

                return false;
            }

            this.jwtToken = response.data.jwtToken;

            notifySuccess("通知", response.message);

            return true;
        },
    },
};

const store = defineStore(name, option);

export default store;