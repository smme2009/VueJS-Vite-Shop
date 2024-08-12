<template>
    <el-container class="h-full">
        <el-header>
            <Header />
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script setup>
import Header from "@/components/shop/layout/default/Header.vue";
</script>
