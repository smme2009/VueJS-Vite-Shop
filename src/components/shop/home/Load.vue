<template>
    <div class="p-1">
        <el-button
            type="primary"
            class="w-full"
            :loading="store.load"
            @click="getProductPage"
        >
            載入更多
        </el-button>
    </div>
</template>

<script setup>
import storeFeProduct from "@/store/frontend/product/Index.js";

const store = storeFeProduct();

/**
 * 取得商品頁面
 *
 * @returns {void}
 */
const getProductPage = () => {
    store.getNextPage();
};
</script>
