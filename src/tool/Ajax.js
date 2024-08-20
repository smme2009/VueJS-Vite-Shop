import axios from 'axios';
import storeBeAdmin from '@/store/backend/admin/Index.js';

/**
 * 發送Ajax
 * 
 * @param {string} method 方法
 * @param {string} uri 路徑
 * @param {object} data 資料
 * @param {object} header Header
 * 
 * @returns {AxiosResponse}
 */
async function ajax(method, uri, data = {}, header = {}) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fullUrl = apiUrl + uri;

    // 取得JWT Token
    const store = storeBeAdmin();
    const jwtToken = store.jwtToken;

    // 基本設定
    const setting = {
        method: method,
        url: fullUrl,
        headers: {
            Authorization: 'Bearer ' + jwtToken,
            ...header,
        },
    };

    // 設定API參數
    if (method === 'get') {
        setting.params = data;
    } else {
        setting.data = data;
    }

    let response = {};

    await axios(setting)
        .then((r) => {
            response = {
                status: true,
                message: r.data.message,
                data: r.data.data,
            };
        }).catch((e) => {
            // 無權限時強制跳轉登入頁
            if (e.response.status === 401) {
                window.location.href = '/mgmt/login';
            }

            response = {
                status: false,
                message: e.response.data.message,
                data: e.response.data.data,
            };
        });

    return response;
}

export default ajax;