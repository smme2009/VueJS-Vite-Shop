const module = {
    namespaced: true,
    state: {
        nowPage: 1, // 現在頁碼
        dataTotal: 0, // 資料總數
    },
    mutations: {
        /**
         * 設定當前頁碼
         * 
         * @param {int} page 頁碼
         * 
         * @returns {void} 
         */
        setNowPage(state, page) {
            state.nowPage = page;
        },

        /**
         * 設定資料總數
         * 
         * @param dataTotal 資料總數
         * 
         * @returns {void}
         */
        setDataTotal(state, dataTotal) {
            state.dataTotal = dataTotal;
        },
    }
};

export default module;