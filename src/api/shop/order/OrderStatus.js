import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 取得訂單狀態列表API
 *
 * @returns {object} 
 */
export const getOrderStatusList = async () => {
    const uri = '/frontend/order/status';

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}