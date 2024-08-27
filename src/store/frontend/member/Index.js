import { defineStore } from 'pinia';

// Store名稱
const name = 'feMember';

// Store設定
const option = {
    persist: true,
    state: () => ({
        jwtToken: '',
    }),
    getters: {
        /**
         * 是否擁有Token
         */
        hasToken(state) {
            const hasToken = (state.jwtToken !== '');

            return hasToken;
        },
    },
    actions: {
        /**
         * 設定JWT Token
         * 
         * @param {string} jwtToken JWT Token
         * 
         * @returns {bool} 
         */
        setJwtToken(jwtToken) {
            this.jwtToken = jwtToken;
        },
    },
};

const store = defineStore(name, option);

export default store;