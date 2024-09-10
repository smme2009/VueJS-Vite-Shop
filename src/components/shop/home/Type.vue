<template>
    <div class="p-1">
        <el-tabs v-model="active" @tab-click="changeProductType">
            <el-tab-pane label="所有商品" :name="null" />
            <el-tab-pane
                v-for="productType in productTypeData"
                :label="productType.name"
                :name="productType.productTypeId"
            />
        </el-tabs>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import storeFeProduct from "@/store/frontend/product/Index.js";
import toolNotify from "@/tool/Notify.js";
import * as apiProductType from "@/api/shop/product/ProductType.js";

const productTypeData = ref([]);
const active = ref();
const store = storeFeProduct();

onMounted(function () {
    // 取得商品類型
    getProductTypeList();
});

/**
 * 取得商品類型列表
 *
 * @returns {void}
 */
const getProductTypeList = async () => {
    const response = await apiProductType.getProductTypeList();

    if (response.status === false) {
        toolNotify({
            type: "error",
            title: "通知",
            message: response.message,
        });

        return;
    }

    const productTypeList = response.data.productTypeList;

    productTypeData.value = [];
    productTypeList.forEach((item) => {
        productTypeData.value.push({
            productTypeId: item.productTypeId,
            name: item.name,
        });
    });
};

/**
 * 切換商品類型
 *
 * @param {object} tab
 *
 * @return {void}
 */
const changeProductType = (tab) => {
    store.productTypeId = tab.props.name;
    store.searchProduct();
};
</script>
