import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 購物車商品列表API
 * 
 * @returns {object} 
 */
export const getCartProductList = async () => {
    const uri = '/frontend/cart';

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}

/**
 * 編輯購物車商品
 * 
 * @param {object} cartProductList 購物車商品
 * 
 * @returns {object}
 */
export const editCartProduct = async (cartProductList) => {
    const uri = '/frontend/cart';

    const data = {
        cartProductList: cartProductList,
    };

    const param = {
        method: 'put',
        apiTarget: apiTarget,
        uri: uri,
        data: data
    };

    const response = await toolAjax(param);

    return response;
}

/**
 * 刪除購物車商品
 * 
 * @param {array} cartIdList 購物車ID列表
 * 
 * @returns {object} 
 */
export const deleteCartProduct = async (cartIdList) => {
    const uri = '/frontend/cart';

    const data = {
        cartIdList: cartIdList,
    };

    const param = {
        method: 'delete',
        apiTarget: apiTarget,
        uri: uri,
        data: data
    };

    const response = await toolAjax(param);

    return response;
}