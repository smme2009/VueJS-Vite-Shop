<template>
    <div class="h-full flex items-center">
        <div class="w-1/4 flex justify-end">
            <router-link
                class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-sky-500"
                :to="{ name: 'shopHome' }"
            >
                COORD
            </router-link>
        </div>
        <el-form
            :model="form"
            class="w-2/4 flex justify-center"
            @submit.prevent
        >
            <el-input
                class="!w-1/2"
                v-model="form.keyword"
                @keypress.enter="searchProduct"
                placeholder="搜尋商品"
            >
                <template #suffix>
                    <el-icon @click="searchProduct">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </el-form>
        <div class="w-1/4 flex justify-start">
            <div class="space-x-3">
                <el-dropdown v-if="storeMember.hasToken" placement="bottom">
                    <el-button type="success" icon="User" circle />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logout">
                                登出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-button
                    v-else
                    type="warning"
                    @click="toLoginPage"
                    icon="User"
                    circle
                />
                <el-button type="warning" icon="ShoppingCart" circle />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { success as notifySuccess } from "@/tool/Notify.js";
import storeFeProduct from "@/store/frontend/product/Index.js";
import storeFeMember from "@/store/frontend/member/Index.js";

const router = useRouter();
const storeProduct = storeFeProduct();
const storeMember = storeFeMember();

const form = reactive({
    keyword: "",
});

/**
 * 搜尋商品
 *
 * @returns {void}
 */
const searchProduct = () => {
    storeProduct.keyword = form.keyword;
    storeProduct.searchProduct();
};

/**
 * 跳轉至登入頁
 *
 * @returns {void}
 */
const toLoginPage = () => {
    router.push({ name: "shopLogin" });
};

/**
 * 登出
 *
 * @returns {void}
 */
const logout = () => {
    storeMember.$reset();
    notifySuccess("通知", "登出成功");
};
</script>
