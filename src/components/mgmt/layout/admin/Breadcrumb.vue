<template>
    <div class="h-10 flex justify-center">
        <div class="w-11/12 flex items-center rounded-lg bg-slate-100">
            <el-breadcrumb class="ml-2" :separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="title in breadcrumb">
                    {{ title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";

const route = useRoute();

// 麵包屑資料
const breadcrumb = ref([]);

onMounted(() => {
    // 初始化麵包屑
    setBreadcrumb();

    // 監聽路由狀況並動態調整麵包屑
    watch(route, setBreadcrumb);
});

/**
 * 設定麵包屑
 *
 * @returns {void}
 */
const setBreadcrumb = () => {
    // 取得路由資料
    const matched = route.matched;

    breadcrumb.value = ["首頁"];

    // 從路由取得麵包屑
    matched.forEach((item) => {
        const title = item.meta.title;

        // 是否不為首頁
        const isNotHome = item.meta.isHome !== true;

        // 是否擁有標題
        const hasTitle = typeof title !== "undefined";

        if (isNotHome && hasTitle) {
            breadcrumb.value.push(title);
        }
    });
};
</script>
