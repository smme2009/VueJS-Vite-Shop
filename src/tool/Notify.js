import { ElNotification } from 'element-plus'

/**
 * 顯示Notify
 * 
 * @param {object} param 參數
 * @param {string} param.type 通知類型
 * @param {string} param.title 標題
 * @param {string|array} param.message 訊息內容
 * @param {boolean} param.autoHide 是否自動隱藏
 * 
 * @returns {void}
 */
const showNotify = (param) => {
    let message = param.message;

    if (message.length === 0) {
        return;
    }

    if (Array.isArray(message)) {
        message = message.join('<br>');
    }

    const setting = {
        type: param.type,
        title: param.title,
        message: message,
        position: 'top-right',
        dangerouslyUseHTMLString: true, // 將傳入訊息判定為HTML
        offset: 50,
    };

    if ((param.autoHide ?? true) == false) {
        setting.duration = 0;
    }

    ElNotification(setting);
};

export default showNotify;