import toolAjax from '@/tool/Ajax.js';

// API目標
const apiTarget = 'shop';

/**
 * 註冊API
 * 
 * @param {object} memberData 會員資料
 * 
 * @returns {object} 
 */
export const register = async (memberData) => {
    const uri = '/frontend/register';

    const param = {
        method: 'post',
        apiTarget: apiTarget,
        uri: uri,
        data: memberData,
    };

    const response = await toolAjax(param);

    return response;
}