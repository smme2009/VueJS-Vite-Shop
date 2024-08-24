<template>
    <div class="h-full flex items-center">
        <div class="w-1/4 flex justify-end">
            <span
                class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-sky-500"
            >
                COORD
            </span>
        </div>
        <div class="w-2/4 flex justify-center">
            <el-input
                class="!w-1/2"
                v-model="keyword"
                @keypress.enter="searchProduct"
                placeholder="搜尋商品"
            >
                <template #suffix>
                    <el-icon @click="searchProduct">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <div class="w-1/4 flex justify-start">
            <div class="flex">
                <el-button
                    v-if="storeFeMember.hasToken"
                    type="warning"
                    icon="User"
                    circle
                />
                <el-button v-else type="success" icon="User" circle />
                <el-button type="warning" icon="ShoppingCart" circle />
            </div>
        </div>
    </div>
</template>

<script setup>
import storeFeProduct from "@/store/frontend/product/Index.js";
import storeFeMember from "@/store/frontend/member/Index.js";

const store = storeFeProduct();
const keyword = defineModel("");

/**
 * 搜尋商品
 *
 * @returns {void}
 */
const searchProduct = () => {
    store.keyword = keyword;
    store.searchProduct();
};
</script>
