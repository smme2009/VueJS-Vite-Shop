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
                v-if="needShowSearchBar"
                class="w-[90%] max-w-96"
                v-model="keyword"
                @keypress.enter="searchData"
                :placeholder="storeSearch.title"
            >
                <template #suffix>
                    <el-icon @click="searchData">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <div class="flex justify-end">
            <div class="flex space-x-2">
                <el-dropdown placement="bottom">
                    <el-button
                        :type="buttonType"
                        icon="User"
                        circle
                        @click="toLoginPage"
                    />
                    <template #dropdown>
                        <el-dropdown-menu v-if="storeMember.hasToken">
                            <el-dropdown-item @click="toOrderListPage">
                                訂單管理
                            </el-dropdown-item>
                            <el-dropdown-item @click="logout">
                                登出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-badge :value="storeCart.memberQuantity">
                    <el-button
                        :type="buttonType"
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
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import toolNotify from "@/tool/Notify.js";
import storeFeSearch from "@/store/frontend/search/Index.js";
import storeFeMember from "@/store/frontend/member/Index.js";
import storeFeCart from "@/store/frontend/cart/Index.js";

const route = useRoute();
const router = useRouter();
const storeSearch = storeFeSearch();
const storeMember = storeFeMember();
const storeCart = storeFeCart();
const keyword = ref("");

// 根據頁面判斷是否顯示搜尋列
const needShowSearchBar = computed(() => {
    const showList = ["shopHome", "shopOrderList"];
    const needShow = showList.includes(route.name);

    return needShow;
});

// 根據登入狀態顯示按鍵顏色
const buttonType = computed(() => {
    const type = storeMember.hasToken ? "success" : "warning";

    return type;
});

onMounted(() => {
    // 登入時刷新購物車資料
    if (storeMember.hasToken === true) {
        storeCart.getMemberCartProductList();
    }
});

/**
 * 搜尋資料
 *
 * @returns {void}
 */
const searchData = () => {
    storeSearch.setKeyword(keyword.value);
    storeSearch.searchFunction();
};

/**
 * 跳轉至登入頁
 *
 * @returns {void}
 */
const toLoginPage = () => {
    if (storeMember.hasToken === false) {
        router.push({ name: "shopLogin" });
    }
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
 * 跳轉至訂單列表頁
 *
 * @returns {void}
 */
const toOrderListPage = () => {
    router.push({ name: "shopOrderList" });
};

/**
 * 登出
 *
 * @returns {void}
 */
const logout = () => {
    storeMember.$reset();
    toolNotify("success", "登出成功");
};
</script>
