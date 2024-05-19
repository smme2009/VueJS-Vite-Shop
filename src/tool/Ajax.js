import axios from 'axios';
import router from '@/router/index.js';

/**
 * 發送Ajax
 * 
 * @param {object} param 參數
 * 
 * @returns {void}
 */
function ajax(param) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fullUrl = apiUrl + param.url;
    const jwtToken = localStorage.getItem('jwtToken');

    // 統一參數
    let data = {};
    let params = {};

    if (param.method === 'get') {
        params = param.data;
    } else {
        data = param.data;
    }

    axios({
        method: param.method,
        url: fullUrl,
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
        data: data,
        params: params,
    })
        .then((response) => {
            const data = response.data;

            param.then(data);
        })
        .catch((error) => {
            const code = error.response.status;
            const data = error.response.data;

            // 選填參數，無填寫執行預設的錯誤處理
            if (param.catch instanceof Function) {
                param.catch(data);
            } else {
                handleError(code, data);
            }
        });
}

/**
 * API錯誤處理
 * 
 * @param {int} code HTTP Code
 * @param {array} data 回傳資料
 * 
 * @returns {void}
 */
function handleError(code, data) {
    switch (code) {
        case 400:
            alert(data.message);
            break;
        case 401:
            alert('請重新登入');

            // 跳轉回登入頁面
            router.push('/account/login');
            break;
        case 404:
            alert(data.message);
            break;
        default:
            alert('系統錯誤');
            break;
    }
}

export default ajax;