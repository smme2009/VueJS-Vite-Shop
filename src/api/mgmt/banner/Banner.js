import toolAjax from '@/tool/Ajax.js';

/**
 * 橫幅列表API
 * 
 * @param {int} page 頁碼
 * @param {string} keyword 關鍵字
 * 
 * @returns {object} 
 */
export const getBannerPage = async (page, keyword) => {
    const uri = '/banner';

    const data = {
        page: page,
        keyword: keyword,
    };

    const response = await toolAjax('get', uri, data);

    return response;
}

/**
 * 刪除橫幅API
 * 
 * @param {int} bannerId 橫幅ID
 * 
 * @returns {object}
 */
export const deleteBanner = async (bannerId) => {
    const uri = `/banner/${bannerId}`;

    const response = await toolAjax('delete', uri);

    return response;
}

/**
 * 編輯橫幅至狀態API
 * 
 * @param {int} bannerId 橫幅ID
 * @param {boolean} status 狀態
 * 
 * @returns {object}
 */
export const editBannerStatus = async (bannerId, status) => {
    const uri = `/banner/${bannerId}/status`;

    const data = {
        status: status,
    };

    const response = await toolAjax('put', uri, data);

    return response;
}

/**
 * 上傳橫幅圖片
 * 
 * @param file 橫幅
 * 
 * @return {object}
 */
export const uploadBannerPhoto = async (file) => {
    const uri = '/banner/photo';

    // 設定Form
    const form = new FormData;
    form.append('photo', file);

    // 設定Header
    const header = {
        "Content-Type": "multipart/form-data"
    };

    const response = await toolAjax('post', uri, form, header);

    return response;
}

/**
 * 新增橫幅
 * 
 * @param {object} bannerData 橫幅資料
 * 
 * @returns {object}
 */
export const addBanner = async (bannerData) => {
    const uri = '/banner';

    const response = await toolAjax('post', uri, bannerData);

    return response;
}

/**
 * 取得橫幅資料
 * 
 * @param {int} bannerId 橫幅ID
 * 
 * @returns {object}
 */
export const getBanner = async (bannerId) => {
    const uri = `/banner/${bannerId}`;

    const response = await toolAjax('get', uri);

    return response;
}

/**
 * 編輯橫幅
 * 
 * @param {int} bannerId 橫幅ID
 * @param {object} bannerData 橫幅資料
 * 
 * @returns {object}
 */
export const editBanner = async (bannerId, bannerData) => {
    const uri = `/banner/${bannerId}`;

    const response = await toolAjax('put', uri, bannerData);

    return response;
}