<template>
    <div
        class="flex flex-wrap justify-start"
        v-loading="store.state.feProduct.load"
    >
        <div
            v-for="product in store.state.feProduct.data"
            class="xs:w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 p-1"
        >
            <el-card class="!rounded-lg">
                <div class="flex justify-center">
                    <el-image
                        class="xs:h-40 ms:h-48 xs:w-40 ms:w-48 rounded-lg"
                        :src="product.photoUrl"
                    />
                </div>
                <p class="truncate">{{ product.name }}</p>
                <p class="text-red-600 font-bold">${{ product.price }}</p>
                <template #footer>
                    <div class="flex justify-end">
                        <el-button-group>
                            <el-tooltip content="直接購買">
                                <el-button icon="Goods" />
                            </el-tooltip>
                            <el-tooltip content="加入購物車">
                                <el-button icon="ShoppingCart" />
                            </el-tooltip>
                        </el-button-group>
                    </div>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
    // 重設商品資料
    store.commit("feProduct/reSetState");

    // 取得商品資料
    store.dispatch("feProduct/toNextPage");
});
</script>
