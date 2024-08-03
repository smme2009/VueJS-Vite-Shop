import toolAjax from '@/tool/Ajax.js';

/**
 * 商品庫存單列表API
 * 
 * @param {int} productId 商品ID
 * @param {int} page 頁碼
 * 
 * @returns {object} 
 */
export const getProductStockPage = async (productId, page) => {
    const uri = `/product/${productId}/stock`;

    const data = {
        page: page,
    };

    const response = await toolAjax('get', uri, data);

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
    const uri = `/product/${productId}/stock`;

    const response = await toolAjax('post', uri, productStockData);

    return response;
}