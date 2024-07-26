import toolAjax from '@/tool/Ajax.js';

/**
 * 商品類型列表API
 * 
 * @param {int} page 頁碼
 * @param {string} keyword 關鍵字
 * 
 * @returns {object} 
 */
export async function getProductTypePage(page, keyword) {
    const uri = '/product/type';

    const data = {
        page: page,
        keyword: keyword,
    };

    const response = await toolAjax('get', uri, data);

    return response;
}

/**
 * 刪除商品類型API
 * 
 * @param {int} productTypeId 商品類型ID
 * 
 * @returns {object}
 */
export async function deleteProductType(productTypeId) {
    const uri = `/product/type/${productTypeId}`;

    const response = await toolAjax('delete', uri);

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
export async function editProductTypeStatus(productTypeId, status) {
    const uri = `/product/type/${productTypeId}/status`;

    const data = {
        status: status,
    };

    const response = await toolAjax('put', uri, data);

    return response;
}

/**
 * 新增商品類型
 * 
 * @param {object} productTypeData 商品類型資料
 * 
 * @returns {object}
 */
export async function addProductType(productTypeData) {
    const uri = '/product/type';

    const response = await toolAjax('post', uri, productTypeData);

    return response;
}

/**
 * 取得商品類型資料
 * 
 * @param {int} productTypeId 商品類型ID
 * 
 * @returns {object}
 */
export async function getProductType(productTypeId) {
    const uri = `/product/type/${productTypeId}`;

    const response = await toolAjax('get', uri);

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
export async function editProductType(productTypeId, productTypeData) {
    const uri = `/product/type/${productTypeId}`;

    const response = await toolAjax('put', uri, productTypeData);

    return response;
}