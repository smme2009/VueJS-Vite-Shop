<template>
    <div class="flex flex-wrap justify-start" v-loading="store.load">
        <div
            v-for="product in store.data"
            class="xs:w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-1"
        >
            <el-card
                class="h-full !rounded-lg"
                body-class="h-full flex flex-col p-0"
            >
                <div class="flex-auto">
                    <el-image
                        class="h-full"
                        :src="product.photoUrl"
                        fit="fill"
                        :title="product.name"
                    />
                </div>
                <div class="flex justify-between p-2">
                    <p class="truncate" :title="product.name">
                        {{ product.name }}
                    </p>
                    <p
                        class="text-red-600 font-bold"
                        :title="'$' + product.price"
                    >
                        ${{ product.price }}
                    </p>
                </div>
                <div class="flex justify-end p-2">
                    <el-button-group>
                        <el-tooltip content="直接購買">
                            <el-button icon="Goods" />
                        </el-tooltip>
                        <el-tooltip content="加入購物車">
                            <el-button icon="ShoppingCart" />
                        </el-tooltip>
                    </el-button-group>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import storeFeProduct from "@/store/frontend/product/Index.js";

const store = storeFeProduct();

onMounted(() => {
    // 重設商品資料
    store.$reset();

    // 搜尋商品資料
    store.getNextPage();
});
</script>
