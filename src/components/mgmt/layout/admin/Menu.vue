<template>
    <el-menu class="h-full w-full" :collapse="!menuStatus">
        <el-menu-item index="1" @click="toPage('mgmtHome')">
            <el-icon>
                <House />
            </el-icon>
            <span>首頁</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toPage('mgmtProduct')">
            <el-icon>
                <Goods />
            </el-icon>
            <span>商品管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="toPage('mgmtProductType')">
            <el-icon>
                <Grid />
            </el-icon>
            <span>商品類型管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="toPage('mgmtBanner')">
            <el-icon>
                <Picture />
            </el-icon>
            <span>橫幅管理</span>
        </el-menu-item>
        <el-menu-item index="5" @click="toPage('mgmtOrder')">
            <el-icon>
                <Tickets />
            </el-icon>
            <span>訂單管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const menuStatus = defineModel();

/**
 * 跳轉至頁面
 *
 * @param {string} pageName 頁面路由名稱
 *
 * @returns {void}
 */
const toPage = (pageName) => {
    router.push({ name: pageName });
};
</script>
