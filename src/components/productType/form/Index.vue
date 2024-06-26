<template>
    <div class="w-full flex justify-center">
        <el-card class="w-11/12 !rounded-lg">
            <template #header>
                <div class="card-header">
                    <span>{{ formTitle }}</span>
                </div>
            </template>
            <el-form :model="form" label-width="auto">
                <el-form-item label="商品類型名稱">
                    <el-input
                        v-model="form.name"
                        placeholder="請輸入商品類型類型名稱"
                    />
                </el-form-item>
                <el-form-item label="狀態">
                    <el-switch v-model="form.status" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="w-full flex justify-end">
                    <el-button type="primary" @click="saveProductType">
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
import * as apiProductType from "@/api/ProductType.js";
import * as toolAlert from "@/tool/Alert.js";

const route = useRoute();
const router = useRouter();

const form = reactive({
    name: "",
    status: false,
});

const formTitle = ref("");

const productTypeId = route.params.productTypeId;

formTitle.value = route.meta.title;

// 若為編輯則取得商品類型資料
if (productTypeId) {
    getProductType();
}

/**
 * 儲存商品類型
 *
 * @returns {void}
 */
const saveProductType = async () => {
    let response = {};

    // 根據新增或編輯使用不同的API
    if (productTypeId) {
        response = await apiProductType.editProductType(productTypeId, form);
    } else {
        response = await apiProductType.addProductType(form);
    }

    if (response.status) {
        toolAlert.success(response.message);

        toListPage();
    } else {
        toolAlert.error(response.message);
    }
};

/**
 * 取得商品類型資料
 *
 * @return {void}
 */
async function getProductType() {
    const response = await apiProductType.getProductType(productTypeId);

    if (response.status) {
        const productType = response.data.productType;

        form.name = productType.name;
        form.status = productType.status;
    } else {
        toolAlert.error(response.message);

        toListPage();
    }
}

/**
 * 進入列表頁面
 *
 * @returns {void}
 */
const toListPage = () => {
    router.push("/mgmt/product/type");
};
</script>
