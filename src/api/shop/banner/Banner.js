import toolAjax from '@/tool/Ajax.js';

/**
 * 橫幅列表API
 *
 * @returns {object} 
 */
export const getBannerList = async () => {
    const uri = '/frontend/banner';

    const response = await toolAjax('get', uri);

    return response;
}