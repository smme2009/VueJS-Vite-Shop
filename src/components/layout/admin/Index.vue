<template>
    <el-container>
        <el-header id="header">
            <Header />
        </el-header>
        <el-container>
            <el-aside id="aside">
                <Menu />
            </el-aside>
            <el-main id="main">
                <el-container>
                    <el-header>
                        <Breadcrumb />
                    </el-header>
                    <el-main>
                        <router-view />
                    </el-main>
                </el-container>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.el-header {
    display: flex;
    align-items: center;
}

#header {
    background-color: #409eff;
}

#main > .el-container {
    margin: -20px;
}

#main > .el-container > .el-header {
    border-bottom: 1px solid #dcdfe6;
}

#aside {
    width: 200px;
}
</style>

<script setup>
import Menu from "@/components/layout/admin/Menu.vue";
import Header from "@/components/layout/admin/Header.vue";
import Breadcrumb from "@/components/layout/admin/Breadcrumb.vue";
</script>
