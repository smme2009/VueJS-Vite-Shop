import toolAjax from '@/tool/Ajax.js';

/**
 * 登入API
 * 
 * @param {string} $account
 * @param {string} $password
 * 
 * @returns {string} 
 */
export const login = async (account, password) => {
    const uri = '/backend/login';

    const data = {
        account: account,
        password: password,
    };

    const response = await toolAjax('post', uri, data);

    return response;
}