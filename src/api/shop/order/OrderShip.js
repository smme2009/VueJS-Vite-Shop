import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 取得訂單運送方式列表API
 *
 * @returns {object} 
 */
export const getOrderShipList = async () => {
    const uri = '/shop/order/ship';

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}