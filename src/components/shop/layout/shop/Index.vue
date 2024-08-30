<template>
    <el-container class="h-full">
        <el-header>
            <Header />
        </el-header>
        <el-main class="h-full flex justify-center">
            <div class="xs:w-full sm:w-[90%] md:w-[80%] xl:w-[70%] 2xl:w-[60%]">
                <router-view></router-view>
            </div>
        </el-main>
    </el-container>
</template>

<script setup>
import Header from "@/components/shop/layout/shop/Header.vue";
</script>
