<template>
    <el-page-header
        class="w-full"
        :icon="ArrowLeft"
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
import { ArrowLeft } from "@element-plus/icons-vue";

const router = useRouter();

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
    localStorage.removeItem("jwtToken");

    router.push("/mgmt/login");
};
</script>
