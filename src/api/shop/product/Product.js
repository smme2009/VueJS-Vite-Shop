import toolAjax from '@/tool/Ajax.js';

/**
 * 商品分頁API
 * 
 * @param {int} page 頁碼
 * @param {object} searchData 搜尋資料
 *
 * @returns {object} 
 */
export const getProductPage = async (page, searchData) => {
    const uri = '/frontend/product';

    const data = {
        page: page,
        productTypeId: searchData.productTypeId,
    };

    const response = await toolAjax('get', uri, data);

    return response;
}