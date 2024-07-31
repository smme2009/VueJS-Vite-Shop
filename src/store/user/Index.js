const module = {
    namespaced: true,
    state: {
        jwtToken: '', // JWT Token
    },
    mutations: {
        /**
         * 設定JWT Token
         * 
         * @param {string} jwtToken JWT Token
         * 
         * @returns {void} 
         */
        setJwtToken(state, jwtToken) {
            state.jwtToken = jwtToken;
        },

        /**
         * 重設JWT Token
         * 
         * @returns {void}
         */
        resetDataTotal(state) {
            state.jwtToken = '';
        },
    }
};

export default module;