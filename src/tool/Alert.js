import { ElMessage } from "element-plus";

/**
 * 成功Alert
 * 
 * @param {string|array} message 訊息內容
 * 
 * @returns {void} 
 */
export function success(message) {
    showAlert('success', message)
}

/**
 * 失敗Alert
 * 
 * @param {string|array} message 訊息內容
 * 
 * @returns {void} 
 */
export function error(message) {
    showAlert('error', message)
}

/**
 * 顯示Alert
 * 
 * @param {string} type 訊息類型
 * @param {string|array} message 訊息內容
 * 
 * @returns {void}
 */
function showAlert(type, message) {
    if (typeof message === 'string') {
        message = [message];
    }

    message.forEach((v) => {
        ElMessage({
            type: type,
            message: v,
            showClose: true,
        });
    });
};