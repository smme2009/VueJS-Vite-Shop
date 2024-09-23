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
                    <el-button @click="toListPage"> 取消 </el-button>
                    <el-button type="primary" @click="saveProductType">
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
import * as apiProductType from "@/api/mgmt/product/ProductType.js";
import toolNotify from "@/tool/Notify.js";

const route = useRoute();
const router = useRouter();

const form = reactive({
    name: "",
    status: false,
});

const formTitle = ref(route.meta.title);

const productTypeId = route.params.productTypeId;

onMounted(() => {
    // 若為編輯則取得商品類型資料
    if (productTypeId) {
        getProductType();
    }
});

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

    if (response.status === false) {
        toolNotify("error", response.message);
        return;
    }

    toolNotify("success", response.message);
    toListPage();
};

/**
 * 取得商品類型資料
 *
 * @return {void}
 */
const getProductType = async () => {
    const response = await apiProductType.getProductType(productTypeId);

    if (response.status === false) {
        toolNotify("error", response.message);
        toListPage();
        return;
    }

    const productType = response.data.productType;

    form.name = productType.name;
    form.status = productType.status;
};

/**
 * 進入列表頁面
 *
 * @returns {void}
 */
const toListPage = () => {
    router.push({ name: "mgmtProductType" });
};
</script>
