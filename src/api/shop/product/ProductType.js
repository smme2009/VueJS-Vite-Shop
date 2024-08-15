import toolAjax from '@/tool/Ajax.js';

/**
 * 商品分類列表API
 *
 * @returns {object} 
 */
export const getProductTypeList = async () => {
    const uri = '/frontend/product/type';

    const response = await toolAjax('get', uri);

    return response;
}