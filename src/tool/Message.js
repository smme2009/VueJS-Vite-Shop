import { ElMessageBox } from "element-plus";

/**
 * 顯示訊息
 * 
 * @param {object} param 參數  
 * @param {string} param.type 類型  
 * @param {string} param.message 訊息
 * @param {function} param.agree 同意後動作 
 * @param {undefined|function} param.noAgree 不同意後動作
 * 
 * @returns {void} 
 */
const showMessage = (param) => {
    ElMessageBox[param.type]
        (param.message, "訊息", {
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            type: "warning",
        })
        .then(() => {
            param.agree();
        })
        .catch(() => {
            if (typeof param.noAgree !== "undefined") {
                param.noAgree();
            }
        });
};

export default showMessage;