<template>
    <div class="w-full flex justify-center">
        <el-card class="w-11/12 !rounded-lg">
            <template #header>
                <div class="card-header">
                    <span>{{ formTitle }}</span>
                </div>
            </template>
            <el-form :model="form" label-width="auto">
                <el-form-item label="商品名稱">
                    <el-input
                        v-model="form.name"
                        placeholder="請輸入商品名稱"
                    />
                </el-form-item>
                <el-form-item v-if="photoUrl" label="預覽照片">
                    <el-image class="w-32 h-32" :src="photoUrl" fit="fill" />
                </el-form-item>
                <el-form-item label="商品照片">
                    <el-upload
                        :show-file-list="false"
                        :http-request="uploadPhoto"
                    >
                        <el-button type="primary">上傳檔案</el-button>
                        <template #tip>
                            <div class="el-upload__tip">
                                需為圖片格式，且檔案大小不得超過10MB
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品價格">
                    <el-input-number v-model="form.price" min="0" />
                </el-form-item>
                <el-form-item label="商品數量">
                    <el-input-number v-model="form.quantity" min="0" />
                </el-form-item>
                <el-form-item label="商品上架時間">
                    <el-date-picker
                        v-model="form.startTime"
                        type="datetime"
                        placeholder="選擇商品上架時間"
                        :format="timeFormat"
                        :value-format="timeFormat"
                    />
                </el-form-item>
                <el-form-item label="商品下架時間">
                    <el-date-picker
                        v-model="form.endTime"
                        type="datetime"
                        placeholder="請選擇商品下架時間"
                        :format="timeFormat"
                        :value-format="timeFormat"
                    />
                </el-form-item>
                <el-form-item label="商品介紹">
                    <el-input
                        v-model="form.description"
                        rows="10"
                        type="textarea"
                        placeholder="請輸入商品介紹"
                    />
                </el-form-item>
                <el-form-item label="狀態">
                    <el-switch v-model="form.status" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="w-full flex justify-end">
                    <el-button type="primary" @click="saveProduct">
                        儲存
                    </el-button>
                    <el-button type="danger" @click="toListPage">
                        取消
                    </el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as apiProduct from "@/api/Product.js";
import * as toolAlert from "@/tool/Alert.js";
import * as toolTime from "@/tool/Time.js";

const route = useRoute();
const router = useRouter();

const form = reactive({
    name: "",
    photoFileId: null,
    price: 0,
    quantity: 0,
    startTime: "",
    endTime: "",
    description: "",
    status: false,
});

const formTitle = ref("");
const photoUrl = ref("");
const timeFormat = ref("YYYY-MM-DD HH:mm:ss");

const productId = route.params.productId;

formTitle.value = route.meta.title;

// 若為編輯則取得商品資料
if (productId) {
    getProduct();
}

/**
 * 上傳照片
 *
 * @param {object} data 資料
 *
 * @return {void}
 */
const uploadPhoto = async (data) => {
    const response = await apiProduct.uploadProductPhoto(data.file);

    if (response.status) {
        const fileInfo = response.data.fileInfo;

        photoUrl.value = fileInfo.url;
        form.photoFileId = fileInfo.fileId;
    } else {
        console.log(response.message);
    }
};

/**
 * 儲存商品
 *
 * @returns {void}
 */
const saveProduct = async () => {
    let response = {};

    // 根據新增或編輯使用不同的API
    if (productId) {
        response = await apiProduct.editProduct(productId, form);
    } else {
        response = await apiProduct.addProduct(form);
    }

    if (response.status) {
        toolAlert.success(response.message);

        router.push("/mgmt/product");
    } else {
        toolAlert.error(response.message);
    }
};

/**
 * 進入列表頁面
 *
 * @returns {void}
 */
const toListPage = () => {
    router.push("/mgmt/product");
};

/**
 * 取得商品資料
 *
 * @return {void}
 */
async function getProduct() {
    const response = await apiProduct.getProduct(productId);

    if (response.status) {
        const product = response.data.product;

        form.name = product.name;
        form.photoFileId = product.photoFileId;
        form.price = product.price;
        form.quantity = product.quantity;
        form.startTime = toolTime.getDateTime(product.startTime);
        form.endTime = toolTime.getDateTime(product.endTime);
        form.description = product.description;
        form.status = product.status;

        photoUrl.value = product.photoUrl;
    } else {
        toolAlert.error(response.message);

        toListPage();
    }
}
</script>
