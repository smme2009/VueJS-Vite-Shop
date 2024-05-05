import axios from 'axios';

/**
 * 發送Ajax
 * 
 * @param {object} param 參數
 * 
 * @return {void}
 */
function ajax(param) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fullUrl = apiUrl + param.url;
    const jwtToken = localStorage.getItem('jwtToken');

    axios({
        method: param.method,
        url: fullUrl,
        headers: {
            Authorization: 'Bearer ' + jwtToken,
        },
        data: param.data,
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
 * @return {void}
 */
function handleError(code, data) {
    switch (code) {
        case 400:
        case 404:
            alert(data.message);
            break;
        default:
            alert('系統錯誤');
            break;
    }
}

export default ajax;