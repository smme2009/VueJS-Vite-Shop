import toolAjax from '@/tool/Ajax.js';

/**
 * 商品列表API
 * 
 * @param {int} page 頁碼
 * @param {string} keyword 關鍵字
 * 
 * @returns {object} 
 */
export async function getProductPage(page, keyword) {
    const uri = '/product';

    const data = {
        page: page,
        keyword: keyword,
    };

    const response = await toolAjax('get', uri, data);

    return response;
}

/**
 * 刪除商品API
 * 
 * @param {int} productId 商品ID
 * 
 * @returns {object}
 */
export async function deleteProduct(productId) {
    const uri = `/product/${productId}`;

    const response = await toolAjax('delete', uri);

    return response;
}

/**
 * 編輯商品至狀態API
 * 
 * @param {int} productId 商品ID
 * @param {boolean} status 狀態
 * 
 * @returns {object}
 */
export async function editProductStatus(productId, status) {
    const uri = `/product/${productId}/status`;

    const data = {
        status: status,
    };

    const response = await toolAjax('put', uri, data);

    return response;
}