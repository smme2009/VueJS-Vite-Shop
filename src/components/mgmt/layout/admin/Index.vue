<template>
    <el-container class="h-full w-full">
        <el-header class="flex items-center bg-blue-500">
            <Header />
        </el-header>
        <el-main class="p-0 flex">
            <div class="w-[250px]">
                <Menu />
            </div>
            <div class="flex-grow flex justify-center overflow-auto">
                <div class="w-[90%]">
                    <Breadcrumb class="mt-4 mb-4" />
                    <router-view />
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script setup>
import Menu from "@/components/mgmt/layout/admin/Menu.vue";
import Header from "@/components/mgmt/layout/admin/Header.vue";
import Breadcrumb from "@/components/mgmt/layout/admin/Breadcrumb.vue";
</script>
