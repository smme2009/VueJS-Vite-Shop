import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 登入API
 * 
 * @param {string} $account
 * @param {string} $password
 * 
 * @returns {string} 
 */
export const login = async (account, password) => {
    const uri = '/shop/login';

    const data = {
        account: account,
        password: password,
    };

    const param = {
        method: 'post',
        apiTarget: apiTarget,
        uri: uri,
        data: data,
    };

    const response = await toolAjax(param);

    return response;
}