import toolAjax from '@/tool/Ajax.js';

/**
 * 商品庫存單類型API
 * 
 * @returns {object} 
 */
export const getProductStockTypeList = async () => {
    const uri = '/backend/product/stock/type';

    const response = await toolAjax('get', uri);

    return response;
}