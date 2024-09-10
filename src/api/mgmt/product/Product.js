import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'mgmt';

/**
 * 商品列表API
 * 
 * @param {int} page 頁碼
 * @param {string} keyword 關鍵字
 * 
 * @returns {object} 
 */
export const getProductPage = async (page, keyword) => {
    const uri = '/backend/product';

    const data = {
        page: page,
        keyword: keyword,
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
 * 刪除商品API
 * 
 * @param {int} productId 商品ID
 * 
 * @returns {object}
 */
export const deleteProduct = async (productId) => {
    const uri = `/backend/product/${productId}`;

    const param = {
        method: 'delete',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

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
    const uri = `/backend/product/${productId}/status`;

    const data = {
        status: status,
    };

    const param = {
        method: 'put',
        apiTarget: apiTarget,
        uri: uri,
        data: data,
    };

    const response = await toolAjax(param);

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
    const uri = '/backend/product/photo';

    // 設定Form
    const form = new FormData;
    form.append('photo', file);

    // 設定Header
    const header = {
        "Content-Type": "multipart/form-data"
    };

    const param = {
        method: 'post',
        apiTarget: apiTarget,
        uri: uri,
        data: form,
        header: header,
    };

    const response = await toolAjax(param);

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
    const uri = '/backend/product';

    const param = {
        method: 'post',
        apiTarget: apiTarget,
        uri: uri,
        data: productData,
    };

    const response = await toolAjax(param);

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
    const uri = `/backend/product/${productId}`;

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

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
    const uri = `/backend/product/${productId}`;

    const param = {
        method: 'put',
        apiTarget: apiTarget,
        uri: uri,
        data: productData,
    };

    const response = await toolAjax(param);

    return response;
}