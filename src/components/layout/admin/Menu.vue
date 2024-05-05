<template>
    <el-menu @click="toPage">
        <el-menu-item index="1" @click="toPage('/mgmt/home')">
            <el-icon>
                <House />
            </el-icon>
            <template #title>首頁</template>
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
 * @return {void}
 */
const toPage = (path) => {
    router.push(path);
};
</script>
