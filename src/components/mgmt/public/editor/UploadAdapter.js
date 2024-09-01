import storeBeAdmin from "@/store/backend/admin/Index.js";

export default class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        const upload = this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));

        return upload;
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // 設定Ajax
    _initRequest() {
        const store = storeBeAdmin();
        const xhr = this.xhr = new XMLHttpRequest();
        const uploadUrl = import.meta.env.VITE_API_URL + "/backend/editor/photo";

        xhr.open('post', uploadUrl, true);
        xhr.setRequestHeader("Authorization", "Bearer " + store.jwtToken);
        xhr.responseType = 'json';
    }

    // 設定監聽器
    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const errorMessage = '上傳圖片失敗';

        xhr.addEventListener('error', () => reject(errorMessage));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const httpCode = xhr.status;
            const response = xhr.response;

            if (httpCode !== 200) {
                return reject(response.message);
            }

            resolve({
                default: response.data.fileInfo.url,
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // 設定Request參數
    _sendRequest(file) {
        const form = new FormData();

        form.append('photo', file);

        this.xhr.send(form);
    }
}