import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 取得會員地址列表API
 * 
 * @returns {object} 
 */
export const getMemberAddressList = async () => {
    const uri = '/frontend/member/address';

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}

/**
 * 新增會員地址API
 * 
 * @param {string} address 地址
 * 
 * @returns {object}
 */
export const addMemberAddress = async (address) => {
    const uri = '/frontend/member/address';

    const data = {
        address: address,
    };

    const param = {
        method: 'post',
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