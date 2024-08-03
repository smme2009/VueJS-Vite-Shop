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
                <el-form-item label="商品類型">
                    <el-select
                        class="!w-1/4"
                        v-model="form.productTypeId"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="請選擇商品類型"
                        loading-text="讀取中..."
                        no-data-text="無資料"
                        :loading="productTypeLoading"
                        :remote-method="getProductType"
                    >
                        <el-option
                            v-for="item in productType"
                            :label="item.name"
                            :value="item.productTypeId"
                        />
                    </el-select>
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
                    <el-button @click="toListPage"> 取消 </el-button>
                    <el-button type="primary" @click="saveProduct">
                        儲存
                    </el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as apiProduct from "@/api/mgmt/product/Product.js";
import * as apiProductType from "@/api/mgmt/product/ProductType.js";
import * as toolNotify from "@/tool/Notify.js";
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
    productTypeId: null,
});

const formTitle = ref(route.meta.title);
const photoUrl = ref("");
const timeFormat = ref("YYYY-MM-DD HH:mm:ss");
const productType = ref([]);
const productTypeLoading = ref(false);

const productId = route.params.productId;

onMounted(() => {
    // 若為編輯則取得商品資料
    if (productId) {
        getProduct();
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
    const response = await apiProduct.uploadProductPhoto(data.file);

    if (response.status) {
        const fileInfo = response.data.fileInfo;

        photoUrl.value = fileInfo.url;
        form.photoFileId = fileInfo.fileId;
    } else {
        toolNotify.error("通知", response.message, false);
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
        toolNotify.success("通知", response.message);

        toListPage();
    } else {
        toolNotify.error("通知", response.message, false);
    }
};

/**
 * 取得商品資料
 *
 * @return {void}
 */
const getProduct = async () => {
    const response = await apiProduct.getProduct(productId);

    if (response.status) {
        const product = response.data.product;

        // 根據資料加入預設的商品類型選項
        const data = {
            productTypeId: product.productTypeId,
            name: product.productTypeName,
        };

        productType.value.push(data);

        form.name = product.name;
        form.photoFileId = product.photoFileId;
        form.price = product.price;
        form.quantity = product.quantity;
        form.startTime = toolTime.getDateTime(product.startTime);
        form.endTime = toolTime.getDateTime(product.endTime);
        form.description = product.description;
        form.status = product.status;
        form.productTypeId = product.productTypeId;

        photoUrl.value = product.photoUrl;
    } else {
        toolNotify.error("通知", response.message);

        toListPage();
    }
};

/**
 * 進入列表頁面
 *
 * @returns {void}
 */
const toListPage = () => {
    router.push({ name: "mgmtProduct" });
};

/**
 * 取得商品類型資料
 *
 * @param {string} keyword 關鍵字
 *
 * @return {void}
 */
const getProductType = async (keyword) => {
    productTypeLoading.value = true;

    const response = await apiProductType.getProductTypePage(1, keyword);

    if (response.status) {
        const productTypePage = response.data.productTypePage;

        // 設定列表資料
        productType.value = [];
        productTypePage.data.forEach((item) => {
            const data = {
                productTypeId: item.productTypeId,
                name: item.name,
            };

            productType.value.push(data);
        });
    } else {
        toolNotify.error("通知", response.message);
    }

    productTypeLoading.value = false;
};
</script>
