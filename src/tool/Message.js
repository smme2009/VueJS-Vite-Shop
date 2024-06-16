import { ElMessageBox } from "element-plus";

/**
 * 訊息(確認)
 * 
 * @param {string} message 訊息內容
 * @param agree 同意後動作 
 * @param noAgree 不同意後動作
 * 
 * @returns {void}
 */
export function confirm(message, agree, noAgree = null) {
    ElMessageBox.confirm(message, "訊息", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            agree();
        })
        .catch(() => {
            if (noAgree !== null) {
                noAgree();
            }
        });
}