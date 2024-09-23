import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'mgmt';

/**
 * 取得訂單分頁API
 * 
 * @param {int} page 頁碼
 * @param {string} keyword 關鍵字
 * 
 * @returns {object} 
 */
export const getOrderPage = async (page, keyword) => {
    const uri = '/backend/order';

    const data = {
        page: page,
        keyword: keyword,
    };

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
        data: data,
    };

    const response = await toolAjax(param);

    return response;
}

/**
 * 取得訂單
 * 
 * @param {int} orderId 
 * 
 * @returns {object} 
 */
export const getOrder = async (orderId) => {
    const uri = `/backend/order/${orderId}`;

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}