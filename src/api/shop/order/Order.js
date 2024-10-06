import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';


/**
 * 取得訂單分頁
 * 
 * @param {int} page 頁碼
 * @param {string} keyword 關鍵字
 * 
 * @returns {void}
 */
export const getOrderPage = async (page, keyword = '') => {
    const uri = '/shop/order';

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
 * 新增訂單API
 * 
 * @param {object} order 訂單
 *
 * @returns {object} 
 */
export const addOrder = async (order) => {
    const uri = '/shop/order';

    const param = {
        method: 'post',
        apiTarget: apiTarget,
        uri: uri,
        data: order,
    };

    const response = await toolAjax(param);

    return response;
}