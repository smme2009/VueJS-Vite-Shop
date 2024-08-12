import toolAjax from '@/tool/Ajax.js';

/**
 * 商品分頁API
 * 
 * @param {int} page 頁碼
 *
 * @returns {object} 
 */
export const getProductPage = async (page) => {
    const uri = '/frontend/product';

    const data = {
        page: page,
    };

    const response = await toolAjax('get', uri, data);

    return response;
}