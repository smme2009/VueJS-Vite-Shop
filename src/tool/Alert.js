import { ElMessage } from "element-plus";

/**
 * 成功Alert
 * 
 * @param {string} message 訊息內容
 * 
 * @returns {void} 
 */
export function success(message) {
    showAlert('success', message)
}

/**
 * 失敗Alert
 * 
 * @param {string} message 訊息內容
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
 * @param {string} message 訊息內容
 * 
 * @returns {void}
 */
function showAlert(type, message) {
    ElMessage({
        type: type,
        message: message,
        showClose: true,
    });
};