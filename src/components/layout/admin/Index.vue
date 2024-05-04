<template>
    <el-container>
        <el-header>Logo</el-header>
        <el-container>
            <el-aside width="200px"></el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.el-container {
    height: 100%
}
</style>