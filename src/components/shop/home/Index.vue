<template>
    <div class="flex justify-center">
        <div class="xs:w-full md:w-5/6">
            <div>
                <!-- 輪播圖 -->
                <page />
                <!-- 分類列表 -->
                <!-- 商品列表 -->
                <product />
                <!-- 載入更多按鈕 -->
                <load />
            </div>
        </div>
    </div>
</template>

<script setup>
import page from "@/components/shop/home/Banner.vue";
import product from "@/components/shop/home/Product.vue";
import load from "@/components/shop/home/Load.vue";
</script>
