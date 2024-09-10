import { defineStore } from 'pinia';

// Store名稱
const name = 'bePage';

// Store設定
const option = {
    state: () => ({
        nowPage: null, // 現在頁碼
        dataTotal: 0, // 資料總數
    }),
};

const store = defineStore(name, option);

export default store;