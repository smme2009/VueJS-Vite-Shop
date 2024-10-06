import { ElNotification } from 'element-plus'

/**
 * 顯示Notify
 * 
 * @param {string} type 通知類型
 * @param {string|array} message 訊息內容
 * 
 * @returns {void}
 */
const showNotify = (type, message) => {
    if (message.length === 0) {
        return;
    }

    if (Array.isArray(message)) {
        message = message.join('<br>');
    }

    const setting = {
        type: type,
        title: '通知',
        message: message,
        position: 'top-right',
        dangerouslyUseHTMLString: true, // 將傳入訊息判定為HTML
        offset: 50,
    };

    ElNotification(setting);
};

export default showNotify;