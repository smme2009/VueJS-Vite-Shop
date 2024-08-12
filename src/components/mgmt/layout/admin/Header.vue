<template>
    <el-page-header
        class="w-full"
        icon="ArrowLeft"
        title="返回"
        @back="toBackPage()"
    >
        <template #content>
            <span>商店後台管理系統</span>
        </template>
        <template #extra>
            <span @click="logout()">登出</span>
        </template>
    </el-page-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

/**
 * 返回上一頁
 *
 * @returns {void}
 */
const toBackPage = () => {
    router.back();
};

/**
 * 登出
 *
 * @returns {void}
 */
const logout = () => {
    store.commit("beUser/resetJwtToken");

    router.push({ name: "mgmtLogin" });
};
</script>
