<template>
    <el-menu>
        <el-menu-item index="1" @click="toPage('/mgmt/home')">
            <el-icon>
                <House />
            </el-icon>
            <template #title>首頁</template>
        </el-menu-item>
        <el-menu-item index="2" @click="toPage('/mgmt/product')">
            <el-icon>
                <Goods />
            </el-icon>
            <template #title>商品管理</template>
        </el-menu-item>
    </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
    height: 100%;
    width: 100%;
}
</style>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

/**
 * 跳轉頁面
 *
 * @param {string} path 路徑
 *
 * @returns {void}
 */
const toPage = (path) => {
    router.push(path);
};
</script>
