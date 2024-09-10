import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'mgmt';

/**
 * 商品庫存單類型API
 * 
 * @returns {object} 
 */
export const getProductStockTypeList = async () => {
    const uri = '/backend/product/stock/type';

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}