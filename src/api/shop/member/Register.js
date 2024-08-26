import toolAjax from '@/tool/Ajax.js';

/**
 * 註冊API
 * 
 * @param {object} memberData 會員資料
 * 
 * @returns {object} 
 */
export const register = async (memberData) => {
    const uri = '/frontend/register';

    const response = await toolAjax('post', uri, memberData);

    return response;
}