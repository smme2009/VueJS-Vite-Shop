<template>
    <el-page-header class="w-full" :icon="icon" title=" " @back="setMenuStatus">
        <template #content>
            <button link @click="toHomePage">商店後台管理系統</button>
        </template>
        <template #extra>
            <button link @click="logout">登出</button>
        </template>
    </el-page-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import storeBeAdmin from "@/store/backend/admin/Index.js";
import { computed } from "vue";

const router = useRouter();
const store = storeBeAdmin();
const menuStatus = defineModel();

const icon = computed(() => {
    const name = menuStatus.value === true ? "ArrowLeft" : "ArrowRight";
    return name;
});

/**
 * 設定選單狀態
 *
 * @returns {void}
 */
const setMenuStatus = () => {
    menuStatus.value = !menuStatus.value;
};

/**
 * 跳轉到首頁
 *
 * @returns {void}
 */
const toHomePage = () => {
    router.push({ name: "mgmtHome" });
};

/**
 * 登出
 *
 * @returns {void}
 */
const logout = () => {
    store.$reset();
    router.push({ name: "mgmtLogin" });
};
</script>
