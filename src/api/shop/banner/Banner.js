import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 橫幅列表API
 *
 * @returns {object} 
 */
export const getBannerList = async () => {
    const uri = '/frontend/banner';

    const param = {
        method: 'get',
        apiTarget: apiTarget,
        uri: uri,
    };

    const response = await toolAjax(param);

    return response;
}