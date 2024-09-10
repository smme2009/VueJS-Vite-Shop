import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'mgmt';

/**
 * 商品庫存單列表API
 * 
 * @param {int} productId 商品ID
 * @param {int} page 頁碼
 * 
 * @returns {object} 
 */
export const getProductStockPage = async (productId, page) => {
    const uri = `/backend/product/${productId}/stock`;

    const data = {
        page: page,
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
 * 新增商品庫存單
 * 
 * @param {int} productId 商品ID
 * @param {object} productStockData 商品庫存單資料
 * 
 * @returns {object}
 */
export const addProductStock = async (productId, productStockData) => {
    const uri = `/backend/product/${productId}/stock`;

    const param = {
        method: 'post',
        apiTarget: apiTarget,
        uri: uri,
        data: productStockData,
    };

    const response = await toolAjax(param);

    return response;
}