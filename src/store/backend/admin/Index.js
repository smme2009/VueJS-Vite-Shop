import { defineStore } from 'pinia';

// Store名稱
const name = 'beAdmin';

// Store設定
const option = {
    persist: true,
    state: () => ({
        jwtToken: '',
    }),

};

const store = defineStore(name, option);

export default store;