import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'public';

/**
 * 取得商品類型列表
 * 
 * @returns {object} 
 */
export const getProductTypeList = async () => {
    const uri = '/public/product/type';

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
};