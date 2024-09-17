<template>
    <div class="h-full flex items-center">
        <div class="flex justify-start">
            <router-link
                class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-sky-500"
                :to="{ name: 'shopHome' }"
            >
                COORD
            </router-link>
        </div>
        <div class="flex-auto flex justify-center">
            <el-input
                class="w-[90%] max-w-96"
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
        <div class="flex justify-end">
            <div v-if="storeMember.hasToken" class="flex space-x-2">
                <el-dropdown placement="bottom">
                    <el-button type="success" icon="User" circle />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logout">
                                登出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-badge :value="storeCart.memberQuantity">
                    <el-button
                        type="success"
                        @click="toCartPage"
                        icon="ShoppingCart"
                        circle
                    />
                </el-badge>
            </div>
            <div v-else class="flex space-x-2">
                <el-button
                    type="warning"
                    @click="toLoginPage"
                    icon="User"
                    circle
                />
                <el-badge :value="storeCart.localQuantity">
                    <el-button
                        type="warning"
                        @click="toCartPage"
                        icon="ShoppingCart"
                        circle
                    />
                </el-badge>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import toolNotify from "@/tool/Notify.js";
import storeFeProduct from "@/store/frontend/product/Index.js";
import storeFeMember from "@/store/frontend/member/Index.js";
import storeFeCart from "@/store/frontend/cart/Index.js";

const router = useRouter();
const storeProduct = storeFeProduct();
const storeMember = storeFeMember();
const storeCart = storeFeCart();
const keyword = ref("");

onMounted(() => {
    // 登入時刷新購物車資料
    if (storeMember.hasToken === true) {
        storeCart.getMemberCartProductList();
    }
});

/**
 * 搜尋商品
 *
 * @returns {void}
 */
const searchProduct = () => {
    storeProduct.keyword = keyword.value;
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
 * 跳轉至購物車頁
 *
 * @returns {void}
 */
const toCartPage = () => {
    router.push({ name: "shopCart" });
};

/**
 * 登出
 *
 * @returns {void}
 */
const logout = () => {
    storeMember.$reset();

    toolNotify({
        type: "success",
        title: "通知",
        message: "登出成功",
    });
};
</script>
