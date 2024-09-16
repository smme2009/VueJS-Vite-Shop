<template>
    <el-card class="rounded-lg">
        <template #header>
            <div class="flex">
                <div class="text-center text-2xl font-bold">結帳明細</div>
            </div>
        </template>
        <div class="space-y-1">
            <div class="flex justify-between">
                <div class="text-center text-xl">商品總額</div>
                <div class="text-center text-xl text-red-600">
                    ${{ formatNumber(productTotal) }}
                </div>
            </div>
            <div class="flex justify-between">
                <div class="text-center text-xl">運費</div>
                <div class="text-center text-xl text-red-600">$80</div>
            </div>
        </div>
        <template #footer>
            <div class="flex justify-between">
                <div class="text-center text-xl">預計結帳金額</div>
                <div class="text-center text-xl text-red-600">
                    ${{ formatNumber(productTotal + 80) }}
                </div>
            </div>
        </template>
    </el-card>
</template>

<script setup>
import { computed } from "vue";
import { formatNumber } from "@/tool/Str.js";

const productList = defineModel();

const productTotal = computed(() => {
    let total = 0;
    productList.value.forEach((product) => {
        total += product.productPrice * product.quantity;
    });

    return total;
});
</script>
