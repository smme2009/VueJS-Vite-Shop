import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 商品分類列表API
 *
 * @returns {object} 
 */
export const getProductTypeList = async () => {
    const uri = '/shop/product/type';

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}