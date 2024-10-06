<template>
    <div class="h-10 flex items-center rounded-lg bg-slate-100">
        <el-breadcrumb class="ml-2" :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="title in breadcrumb">
                {{ title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";

const route = useRoute();
const breadcrumb = computed(() => getPageList());

/**
 * 取得頁面列表
 *
 * @returns {array} 頁面列表
 */
const getPageList = () => {
    const page = ["首頁"];

    // 從路由取得頁面名稱
    route.matched.forEach((item) => {
        const title = item.meta.title;
        const isNotHome = item.meta.isHome !== true; // 是否不是首頁
        const hasTitle = typeof title !== "undefined"; // 是否擁有標題

        if (isNotHome && hasTitle) {
            page.push(title);
        }
    });

    return page;
};
</script>
