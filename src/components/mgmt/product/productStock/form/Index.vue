<template>
    <div class="w-full flex justify-center">
        <el-card class="w-11/12 !rounded-lg">
            <template #header>
                <div class="card-header">
                    <span>新增商品庫存單</span>
                </div>
            </template>
            <el-form :model="form" label-width="auto">
                <el-form-item
                    :error="formErrMsg.productStockTypeId"
                    label="商品庫存單類型"
                >
                    <el-select
                        class="!w-1/4"
                        v-model="form.productStockTypeId"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="請選擇商品庫存單類型"
                        loading-text="讀取中..."
                        no-data-text="無資料"
                        :loading="productStockTypeLoading"
                        :remote-method="getProductStockType"
                    >
                        <el-option
                            v-for="item in productStockType"
                            :label="item.name"
                            :value="item.productStockTypeId"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :error="formErrMsg.quantity" label="商品數量">
                    <el-input-number v-model="form.quantity" min="0" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="w-full flex justify-end">
                    <el-button @click="toListPage"> 取消 </el-button>
                    <el-button type="primary" @click="saveProductStock">
                        儲存
                    </el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as apiProductStock from "@/api/mgmt/product/ProductStock.js";
import * as apiProductStockType from "@/api/mgmt/product/ProductStockType.js";
import toolNotify from "@/tool/Notify.js";

const route = useRoute();
const router = useRouter();
const productStockType = ref([]);
const productStockTypeLoading = ref(false);
const productId = route.params.productId;
const formErrMsg = ref({});

const form = reactive({
    productStockTypeId: null,
    quantity: 0,
});

/**
 * 儲存商品庫存單
 *
 * @returns {void}
 */
const saveProductStock = async () => {
    const response = await apiProductStock.addProductStock(productId, form);

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
 * 進入列表頁面
 *
 * @returns {void}
 */
const toListPage = () => {
    const param = {
        productId: productId,
    };

    router.push({
        name: "mgmtProductStock",
        params: param,
    });
};

/**
 * 取得商品庫存單類型資料
 *
 * @return {void}
 */
const getProductStockType = async () => {
    productStockTypeLoading.value = true;

    const response = await apiProductStockType.getProductStockTypeList();

    if (response.status === false) {
        toolNotify("error", response.message);
        productStockTypeLoading.value = false;
        return;
    }

    const productStockTypeList = response.data.productStockTypeList;

    // 設定列表資料
    productStockType.value = [];
    productStockTypeList.forEach((item) => {
        const data = {
            productStockTypeId: item.productStockTypeId,
            name: item.name,
        };

        productStockType.value.push(data);
    });

    productStockTypeLoading.value = false;
};
</script>
