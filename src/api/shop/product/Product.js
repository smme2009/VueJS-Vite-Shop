import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 商品分頁API
 * 
 * @param {int} page 頁碼
 * @param {object} searchData 搜尋資料
 *
 * @returns {object} 
 */
export const getProductPage = async (page, searchData) => {
    const uri = '/shop/product';

    const data = {
        page: page,
        productTypeId: searchData.productTypeId,
        keyword: searchData.keyword,
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
 * 取得商品
 * 
 * @param {int} productId 商品ID
 * 
 * @returns {object}
 */
export const getProduct = async (productId) => {
    const uri = `/shop/product/${productId}`;

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
};