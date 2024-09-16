<template>
    <el-container class="h-full">
        <el-header class="flex justify-center">
            <div class="w-full max-w-[1080px]">
                <Header />
            </div>
        </el-header>
        <el-main class="h-full flex justify-center">
            <div class="w-full max-w-[1080px]">
                <router-view></router-view>
            </div>
        </el-main>
    </el-container>
</template>

<script setup>
import Header from "@/components/shop/layout/shop/Header.vue";
</script>
