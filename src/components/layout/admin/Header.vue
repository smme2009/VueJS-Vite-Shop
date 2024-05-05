<template>
    <el-page-header :icon="ArrowLeft" title="返回" @back="toBackPage()">
        <template #content>
            <span>商店後台管理系統</span>
        </template>
        <template #extra>
            <span @click="logout()">登出</span>
        </template>
    </el-page-header>
</template>

<style lang="scss" scoped>
.el-page-header {
    width: 100%;
}
</style>

<script setup>
import { useRouter } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";

const router = useRouter();

/**
 * 返回上一頁
 *
 * @return {void}
 */
const toBackPage = () => {
    router.back();
};

/**
 * 登出
 *
 * @return {void}
 */
const logout = () => {
    localStorage.removeItem("jwtToken");

    router.push("/account/login");
};
</script>
