<template>
    <el-menu class="h-full w-full">
        <router-link :to="{ name: 'mgmtHome' }">
            <el-menu-item index="1">
                <el-icon>
                    <House />
                </el-icon>
                <template #title>首頁</template>
            </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'mgmtProduct' }">
            <el-menu-item index="2">
                <el-icon>
                    <Goods />
                </el-icon>
                <template #title>商品管理</template>
            </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'mgmtProductType' }">
            <el-menu-item index="3">
                <el-icon>
                    <Grid />
                </el-icon>
                <template #title>商品類型管理</template>
            </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'mgmtBanner' }">
            <el-menu-item index="4">
                <el-icon>
                    <Picture />
                </el-icon>
                <template #title>橫幅管理</template>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>
