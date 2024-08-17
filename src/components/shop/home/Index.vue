<template>
    <div class="flex justify-center">
        <div class="xs:w-full sm:w-5/6">
            <!-- 橫幅 -->
            <banner />
            <!-- 分類列表 -->
            <productType />
            <!-- 商品列表 -->
            <product />
            <!-- 載入更多按鈕 -->
            <load />
        </div>
    </div>
</template>

<script setup>
import banner from "@/components/shop/home/Banner.vue";
import productType from "@/components/shop/home/Type.vue";
import product from "@/components/shop/home/Product.vue";
import load from "@/components/shop/home/Load.vue";
</script>
