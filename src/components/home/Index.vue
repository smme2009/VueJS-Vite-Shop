<template>
    <h1>商店後台管理系統</h1>
    <div id="home-image">
        <el-image :src="HomeImage" />
    </div>
</template>

<style lang="scss" scoped>
h1 {
    font-size: 40px;
    text-align: center;
}

#home-image {
    display: flex;
    justify-content: center;
}

.el-image {
    width: 80%;
    border-radius: 10px;
}
</style>

<script setup>
import HomeImage from "@/assets/image/home.jpg";
</script>
