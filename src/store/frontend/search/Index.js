import { defineStore } from 'pinia';

// Store名稱
const name = 'feSearch';

// Store設定
const option = {
    state: () => ({
        title: '',
        keyword: '',
        searchFunction: null,
    }),
    actions: {
        /**
         * 設定標題
         * 
         * @param {string} title 標題
         * 
         * @return {void}
         */
        setTitle(title) {
            this.title = title;
        },

        /**
         * 設定搜尋方法
         * 
         * @param {function} searchFunction 搜尋用函式
         * 
         * @returns {void}
         */
        setSearchFunction(searchFunction) {
            this.searchFunction = searchFunction;
        },

        /**
         * 設定關鍵字
         * 
         * @param {string} keyword 關鍵字
         * 
         * @returns {void} 
         */
        setKeyword(keyword) {
            this.keyword = keyword;
        }
    },
};

const store = defineStore(name, option);

export default store;