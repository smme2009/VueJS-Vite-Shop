<template>
    <el-container class="h-full">
        <el-header class="flex items-center bg-blue-500">
            <Header />
        </el-header>
        <el-container class="h-full overflow-auto">
            <el-aside class="!w-52">
                <Menu />
            </el-aside>
            <el-main>
                <Breadcrumb class="mb-5" />
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import Menu from "@/components/mgmt/layout/admin/Menu.vue";
import Header from "@/components/mgmt/layout/admin/Header.vue";
import Breadcrumb from "@/components/mgmt/layout/admin/Breadcrumb.vue";
</script>
