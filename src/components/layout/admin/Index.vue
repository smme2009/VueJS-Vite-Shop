<template>
    <el-container>
        <el-header>
            <Header />
        </el-header>
        <el-container>
            <el-aside>
                <Menu />
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.el-header {
    display: flex;
    align-items: center;
    background-color: #409eff;
}

.el-aside {
    width: 200px;
}
</style>

<script setup>
import Menu from "@/components/layout/admin/Menu.vue";
import Header from "@/components/layout/admin/Header.vue";
</script>
