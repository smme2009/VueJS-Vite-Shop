import { ElNotification } from 'element-plus'

/**
 * 成功Notify
 * 
 * @param {string} title 標題
 * @param {string|array} message 訊息內容
 * @param {boolean} autoHide 是否自動隱藏
 * 
 * @returns {void}
 */
export function success(title, message, autoHide = true) {
    showNotify('success', title, message, autoHide);
}

/**
 * 失敗Notify
 * 
 * @param {string} title 標題
 * @param {string|array} message 訊息內容
 * @param {boolean} autoHide 是否自動隱藏
 * 
 * @returns {void}
 */
export function error(title, message, autoHide = true) {
    showNotify('error', title, message, autoHide);
}

/**
 * 顯示Notify
 * 
 * @param {string} type 通知類型
 * @param {string} title 標題
 * @param {string|array} message 訊息內容
 * @param {boolean} autoHide 是否自動隱藏
 * 
 * @returns {void}
 */
function showNotify(type, title, message, autoHide) {
    if (Array.isArray(message)) {
        message = message.join('<br>');
    }

    const setting = {
        type: type,
        title: title,
        message: message,
        position: 'top-right',
        dangerouslyUseHTMLString: true, // 將傳入訊息判定為HTML
    };

    if (!autoHide) {
        setting.duration = 0;
    }

    ElNotification(setting);
};