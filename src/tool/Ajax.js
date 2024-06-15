import axios from 'axios';

/**
 * 發送Ajax
 * 
 * @param {string} method 方法
 * @param {string} uri 路徑
 * @param {object} data 資料
 * 
 * @returns {AxiosResponse}
 */
async function ajax(method, uri, data = {}) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fullUrl = apiUrl + uri;
    const jwtToken = localStorage.getItem('jwtToken');

    // 基本設定
    const setting = {
        method: method,
        url: fullUrl,
        headers: {
            Authorization: 'Bearer ' + jwtToken,
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
                window.location.href = '/account/login';
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