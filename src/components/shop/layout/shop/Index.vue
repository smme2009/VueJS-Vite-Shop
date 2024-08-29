<template>
    <el-container class="h-full flex justify-center">
        <div class="xs:w-full sm:w-[90%] md:w-[80%] xl:w-[70%] 2xl:w-[60%]">
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </div>
    </el-container>
</template>

<script setup>
import Header from "@/components/shop/layout/shop/Header.vue";
</script>
