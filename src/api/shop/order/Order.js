import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 新增訂單API
 * 
 * @param {object} order 訂單
 *
 * @returns {object} 
 */
export const addOrder = async (order) => {
    const uri = '/frontend/order';

    const param = {
        method: 'post',
        apiTarget: apiTarget,
        uri: uri,
        data: order,
    };

    const response = await toolAjax(param);

    return response;
}