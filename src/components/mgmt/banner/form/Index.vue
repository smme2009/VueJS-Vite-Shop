<template>
    <el-card class="rounded-lg">
        <template #header>
            <div class="card-header">
                <span>{{ formTitle }}</span>
            </div>
        </template>
        <el-form :model="form" label-width="auto">
            <el-form-item :error="formErrMsg.name" label="橫幅名稱">
                <el-input v-model="form.name" placeholder="請輸入橫幅名稱" />
            </el-form-item>
            <el-form-item v-if="photoUrl" label="預覽照片">
                <el-image class="h-72" :src="photoUrl" fit="fill" />
            </el-form-item>
            <el-form-item :error="formErrMsg.photoFileId" label="橫幅照片">
                <el-upload :show-file-list="false" :http-request="uploadPhoto">
                    <el-button type="primary" icon="Upload">
                        上傳檔案
                    </el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            需為圖片格式，且檔案大小不得超過10MB
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item :error="formErrMsg.url" label="網址">
                <el-input v-model="form.url" placeholder="請輸入網址" />
            </el-form-item>
            <el-form-item :error="formErrMsg.startTime" label="橫幅上架時間">
                <el-date-picker
                    v-model="form.startTime"
                    type="datetime"
                    placeholder="請選擇橫幅上架時間"
                    :format="timeFormat"
                    :value-format="timeFormat"
                />
            </el-form-item>
            <el-form-item :error="formErrMsg.endTime" label="橫幅下架時間">
                <el-date-picker
                    v-model="form.endTime"
                    type="datetime"
                    placeholder="請選擇橫幅下架時間"
                    :format="timeFormat"
                    :value-format="timeFormat"
                />
            </el-form-item>
            <el-form-item :error="formErrMsg.sort" label="排序">
                <el-input-number v-model="form.sort" min="1" max="100" />
            </el-form-item>
            <el-form-item :error="formErrMsg.status" label="狀態">
                <el-switch v-model="form.status" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="w-full flex justify-end">
                <el-button @click="toListPage"> 取消 </el-button>
                <el-button type="primary" @click="saveBanner"> 儲存 </el-button>
            </div>
        </template>
    </el-card>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as apiBanner from "@/api/mgmt/banner/Banner.js";
import toolNotify from "@/tool/Notify.js";
import * as toolTime from "@/tool/Time.js";

const route = useRoute();
const router = useRouter();
const formTitle = ref(route.meta.title);
const photoUrl = ref("");
const timeFormat = ref("YYYY-MM-DD HH:mm:ss");
const formErrMsg = ref({});
const bannerId = route.params.bannerId;

const form = reactive({
    name: "",
    photoFileId: null,
    url: "",
    startTime: "",
    endTime: "",
    sort: 1,
    status: false,
});

onMounted(() => {
    // 若為編輯則取得橫幅資料
    if (bannerId) {
        getBanner();
    }
});

/**
 * 上傳照片
 *
 * @param {object} data 資料
 *
 * @return {void}
 */
const uploadPhoto = async (data) => {
    const response = await apiBanner.uploadBannerPhoto(data.file);

    if (response.status) {
        const fileInfo = response.data.fileInfo;

        photoUrl.value = fileInfo.url;
        form.photoFileId = fileInfo.fileId;
    } else {
        toolNotify("error", response.message);
    }
};

/**
 * 儲存橫幅
 *
 * @returns {void}
 */
const saveBanner = async () => {
    let response = {};

    // 根據新增或編輯使用不同的API
    if (bannerId) {
        response = await apiBanner.editBanner(bannerId, form);
    } else {
        response = await apiBanner.addBanner(form);
    }

    formErrMsg.value = {};
    if (response.status === false) {
        const errorList = response.data.errorList ?? [];

        errorList.forEach((error) => {
            formErrMsg.value[error.name] = error.message.join("、");
        });

        toolNotify("error", response.message);
        return;
    }

    toolNotify("success", response.message);
    toListPage();
};

/**
 * 取得橫幅資料
 *
 * @return {void}
 */
const getBanner = async () => {
    const response = await apiBanner.getBanner(bannerId);

    if (response.status === false) {
        toolNotify("error", response.message);
        toListPage();
        return;
    }

    const banner = response.data.banner;

    form.name = banner.name;
    form.photoFileId = banner.photoFileId;
    form.url = banner.url;
    form.startTime = toolTime.getDateTime(banner.startTime);
    form.endTime = toolTime.getDateTime(banner.endTime);
    form.sort = banner.sort;
    form.status = banner.status;

    photoUrl.value = banner.photoUrl;
};

/**
 * 進入列表頁面
 *
 * @returns {void}
 */
const toListPage = () => {
    router.push({ name: "mgmtBanner" });
};
</script>
