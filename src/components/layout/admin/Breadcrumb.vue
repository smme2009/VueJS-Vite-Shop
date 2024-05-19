<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item to="home">首頁</el-breadcrumb-item>
        <el-breadcrumb-item
            v-for="item in breadcrumb"
            :to="{ path: item.path }"
        >
            {{ item.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";

const route = useRoute();

// 麵包屑資料
let breadcrumb = ref([]);

// 初始化麵包屑
setBreadcrumb();

// 監聽路由狀況並動態調整麵包屑
watch(route, setBreadcrumb);

/**
 * 設定麵包屑
 *
 * @returns {void}
 */
function setBreadcrumb() {
    // 取得路由資料
    const matched = route.matched;

    breadcrumb.value = [];

    // 從路由取得麵包屑
    matched.forEach((item) => {
        const title = item.meta.title;

        // 是否不為首頁
        const isNotHome = item.meta.isHome !== true;

        // 是否擁有標題
        const hasTitle = typeof title !== "undefined";

        if (isNotHome && hasTitle) {
            breadcrumb.value.push({
                title: title,
                path: item.path,
            });
        }
    });
}
</script>
