<template>
    <el-card class="rounded-lg">
        <template #header>
            <div class="card-header">
                <span>{{ formTitle }}</span>
            </div>
        </template>
        <el-form :model="form" label-width="auto">
            <el-form-item :error="formErrMsg.name" label="商品名稱">
                <el-input v-model="form.name" placeholder="請輸入商品名稱" />
            </el-form-item>
            <el-form-item v-if="photoUrl" label="預覽照片">
                <el-image class="w-32 h-32" :src="photoUrl" fit="fill" />
            </el-form-item>
            <el-form-item :error="formErrMsg.photoFileId" label="商品照片">
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
            <el-form-item :error="formErrMsg.productTypeId" label="商品類型">
                <el-select
                    class="!w-1/4"
                    v-model="form.productTypeId"
                    filterable
                    placeholder="請選擇商品類型"
                    loading-text="讀取中..."
                    no-data-text="無資料"
                    :loading="productTypeLoading"
                >
                    <el-option
                        v-for="item in productTypeList"
                        :label="item.name"
                        :value="item.productTypeId"
                    />
                </el-select>
            </el-form-item>
            <el-form-item :error="formErrMsg.price" label="商品價格">
                <el-input-number v-model="form.price" min="0" />
            </el-form-item>
            <el-form-item :error="formErrMsg.startTime" label="商品上架時間">
                <el-date-picker
                    v-model="form.startTime"
                    type="datetime"
                    placeholder="選擇商品上架時間"
                    :format="timeFormat"
                    :value-format="timeFormat"
                />
            </el-form-item>
            <el-form-item :error="formErrMsg.endTime" label="商品下架時間">
                <el-date-picker
                    v-model="form.endTime"
                    type="datetime"
                    placeholder="請選擇商品下架時間"
                    :format="timeFormat"
                    :value-format="timeFormat"
                />
            </el-form-item>
            <el-form-item :error="formErrMsg.description" label="商品介紹">
                <el-input
                    v-model="form.description"
                    rows="10"
                    type="textarea"
                    placeholder="請輸入商品介紹"
                />
            </el-form-item>
            <el-form-item :error="formErrMsg.pageHtml" label="商品自訂頁面">
                <div class="w-full">
                    <editor v-model="form.pageHtml" />
                </div>
            </el-form-item>
            <el-form-item :error="formErrMsg.status" label="狀態">
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
</template>

<script setup>
import editor from "@/components/mgmt/public/editor/Index.vue";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as apiProduct from "@/api/mgmt/product/Product.js";
import * as apiPubProductType from "@/api/public/product/ProductType.js";
import toolNotify from "@/tool/Notify.js";
import * as toolTime from "@/tool/Time.js";

const route = useRoute();
const router = useRouter();
const formTitle = ref(route.meta.title);
const photoUrl = ref("");
const timeFormat = ref("YYYY-MM-DD HH:mm:ss");
const productTypeList = ref([]);
const productTypeLoading = ref(false);
const formErrMsg = ref({});
const productId = route.params.productId;

const form = reactive({
    name: "",
    photoFileId: null,
    price: 0,
    startTime: "",
    endTime: "",
    description: "",
    status: false,
    productTypeId: null,
    pageHtml: "",
});

onMounted(() => {
    // 取得商品類型列表
    getProductTypeList();

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

    if (response.status === false) {
        toolNotify("error", response.message);
        return;
    }

    const fileInfo = response.data.fileInfo;

    photoUrl.value = fileInfo.url;
    form.photoFileId = fileInfo.fileId;
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
 * 取得商品資料
 *
 * @return {void}
 */
const getProduct = async () => {
    const response = await apiProduct.getProduct(productId);

    if (response.status === false) {
        toolNotify("error", response.message);
        toListPage();
        return;
    }

    const product = response.data.product;

    photoUrl.value = product.photoUrl;
    form.name = product.name;
    form.photoFileId = product.photoFileId;
    form.price = product.price;
    form.startTime = toolTime.getDateTime(product.startTime);
    form.endTime = toolTime.getDateTime(product.endTime);
    form.description = product.description;
    form.pageHtml = product.pageHtml;
    form.status = product.status;
    form.productTypeId = product.productTypeId;
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
 * 取得商品類型列表
 *
 * @return {void}
 */
const getProductTypeList = async () => {
    productTypeLoading.value = true;

    const response = await apiPubProductType.getProductTypeList();

    if (response.status === false) {
        toolNotify("error", response.message);
        productTypeLoading.value = false;
        return;
    }

    // 設定列表資料
    response.data.productTypeList.forEach((item) => {
        productTypeList.value.push({
            productTypeId: item.productTypeId,
            name: item.name,
        });
    });

    productTypeLoading.value = false;
};
</script>
