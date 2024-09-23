<template>
    <!-- 橫幅 -->
    <banner />
    <!-- 分類列表 -->
    <productType v-model="productTypeId" />
    <!-- 商品列表 -->
    <product v-model="productTypeId" />
</template>

<script setup>
import { ref } from "vue";
import banner from "@/components/shop/home/Banner.vue";
import productType from "@/components/shop/home/Type.vue";
import product from "@/components/shop/home/Product.vue";

const productTypeId = ref(null);
</script>
