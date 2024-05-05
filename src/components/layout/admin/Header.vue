<template>
    <el-page-header :icon="ArrowLeft" title="返回" @back="toBackPage()">
        <template #content>
            <span>{{ title }}</span>
        </template>
    </el-page-header>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();

// 標題
const title = route.meta.title;

/**
 * 返回上一頁
 *
 * @return {void}
 */
const toBackPage = () => {
    router.back();
};
</script>
