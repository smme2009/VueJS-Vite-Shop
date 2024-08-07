import toolAjax from '@/tool/Ajax.js';

/**
 * 商品列表API
 * 
 * @param {int} page 頁碼
 * @param {string} keyword 關鍵字
 * 
 * @returns {object} 
 */
export const getProductPage = async (page, keyword) => {
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
export const deleteProduct = async (productId) => {
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
export const editProductStatus = async (productId, status) => {
    const uri = `/product/${productId}/status`;

    const data = {
        status: status,
    };

    const response = await toolAjax('put', uri, data);

    return response;
}

/**
 * 上傳商品圖片
 * 
 * @param file 商品
 * 
 * @return {object}
 */
export const uploadProductPhoto = async (file) => {
    const uri = '/product/photo';

    // 設定Form
    const form = new FormData;
    form.append('photo', file);

    // 設定Header
    const header = {
        "Content-Type": "multipart/form-data"
    };

    const response = await toolAjax('post', uri, form, header);

    return response;
}

/**
 * 新增商品
 * 
 * @param {object} productData 商品資料
 * 
 * @returns {object}
 */
export const addProduct = async (productData) => {
    const uri = '/product';

    const response = await toolAjax('post', uri, productData);

    return response;
}

/**
 * 取得商品資料
 * 
 * @param {int} productId 商品ID
 * 
 * @returns {object}
 */
export const getProduct = async (productId) => {
    const uri = `/product/${productId}`;

    const response = await toolAjax('get', uri);

    return response;
}

/**
 * 編輯商品
 * 
 * @param {int} productId 商品ID
 * @param {object} productData 商品資料
 * 
 * @returns {object}
 */
export const editProduct = async (productId, productData) => {
    const uri = `/product/${productId}`;

    const response = await toolAjax('put', uri, productData);

    return response;
}