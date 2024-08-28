import axios from 'axios';
import router from '@/router/index.js';
import storeBeAdmin from "@/store/backend/admin/Index.js";
import storeBeMember from "@/store/frontend/member/Index.js";
import toolNotify from "@/tool/Notify.js";

/**
 * 發送Ajax
 * 
 * @param {object} param 參數
 * @param {string} param.method 方法
 * @param {string} param.apiTarget API目標
 * @param {string} param.uri 路徑
 * @param {object} param.data 資料
 * @param {object} param.header Header
 * 
 * @returns {object}
 */
const ajax = async (param) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fullUrl = apiUrl + param.uri;

    const store = {
        mgmt: storeBeAdmin(),
        shop: storeBeMember(),
    };

    const jwtToken = store[param.apiTarget].jwtToken;

    // 基本設定
    const setting = {
        method: param.method,
        url: fullUrl,
        headers: {
            Authorization: "Bearer " + jwtToken,
            ...(param.header ?? {}),
        },
    };

    const paramName = (param.method === "get") ? "params" : "data";
    setting[paramName] = param.data ?? {};

    let response = {};
    await axios(setting)
        .then((r) => {
            response = {
                status: true,
                message: r.data.message,
                data: r.data.data,
            };
        }).catch((e) => {
            switch (e.response.status) {
                case 401: // 無權限時強制跳轉登入頁
                    toolNotify({
                        type: "error",
                        title: "通知",
                        message: "請重新登入",
                        autoHide: false,
                    });

                    router.push({ name: `${param.apiTarget}Login` })

                    break;
                default: // 其餘Code回傳處理
                    response = {
                        status: false,
                        message: e.response.data.message,
                        data: e.response.data.data,
                    };

                    break;
            }
        });

    return response;
}

export default ajax;