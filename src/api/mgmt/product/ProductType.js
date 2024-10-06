import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'mgmt';

/**
 * 商品類型列表API
 * 
 * @param {int} page 頁碼
 * @param {string} keyword 關鍵字
 * 
 * @returns {object} 
 */
export const getProductTypePage = async (page, keyword) => {
    const uri = '/mgmt/product/type';

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
 * 刪除商品類型API
 * 
 * @param {int} productTypeId 商品類型ID
 * 
 * @returns {object}
 */
export const deleteProductType = async (productTypeId) => {
    const uri = `/mgmt/product/type/${productTypeId}`;

    const param = {
        method: 'delete',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}

/**
 * 編輯商品類型狀態API
 * 
 * @param {int} productTypeId 商品類型ID
 * @param {boolean} status 狀態
 * 
 * @returns {object}
 */
export const editProductTypeStatus = async (productTypeId, status) => {
    const uri = `/mgmt/product/type/${productTypeId}/status`;

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
 * 新增商品類型
 * 
 * @param {object} productTypeData 商品類型資料
 * 
 * @returns {object}
 */
export const addProductType = async (productTypeData) => {
    const uri = '/mgmt/product/type';

    const param = {
        method: 'post',
        apiTarget: apiTarget,
        uri: uri,
        data: productTypeData,
    };

    const response = await toolAjax(param);

    return response;
}

/**
 * 取得商品類型資料
 * 
 * @param {int} productTypeId 商品類型ID
 * 
 * @returns {object}
 */
export const getProductType = async (productTypeId) => {
    const uri = `/mgmt/product/type/${productTypeId}`;

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}

/**
 * 編輯商品類型
 * 
 * @param {int} productTypeId 商品類型ID
 * @param {object} productTypeData 商品類型資料
 * 
 * @returns {object}
 */
export const editProductType = async (productTypeId, productTypeData) => {
    const uri = `/mgmt/product/type/${productTypeId}`;

    const param = {
        method: 'put',
        apiTarget: apiTarget,
        uri: uri,
        data: productTypeData,
    };

    const response = await toolAjax(param);

    return response;
}