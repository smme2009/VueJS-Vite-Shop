<template>
    <el-card class="rounded-lg">
        <template #header>
            <div class="text-2xl font-bold">商品明細</div>
        </template>
        <div class="space-y-1">
            <div
                v-for="product in productList"
                class="h-24 border rounded-lg flex"
            >
                <div class="h-full w-24 p-1">
                    <img
                        class="h-full w-full rounded-lg"
                        :src="product.productPhotoUrl"
                    />
                </div>
                <div class="flex-auto flex flex-wrap items-center space-x-1">
                    <div class="text-1xl font-bold">
                        {{ product.productName }}
                    </div>
                    <div class="text-1xl font-bold text-red-600">
                        ${{ formatNumber(product.productPrice) }}
                    </div>
                    <div>x{{ product.quantity }}</div>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script setup>
import { formatNumber } from "@/tool/Str.js";

const productList = defineModel();
</script>
