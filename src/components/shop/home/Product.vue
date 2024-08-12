<template>
    <div class="flex justify-center">
        <div class="xs:w-full md:w-5/6 flex flex-wrap justify-start">
            <div
                v-for="product in productData"
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
                    <p class="text-red-600">${{ product.price }}</p>
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
            <el-button
                type="primary"
                class="w-full m-2"
                @click="getProductPage"
            >
                載入更多
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as toolNotify from "@/tool/Notify.js";
import * as apiProduct from "@/api/shop/product/Product.js";

const page = ref(0);
const productData = ref([]);

onMounted(() => {
    // 取得商品分頁
    getProductPage();
});

/**
 * 取得商品分頁
 *
 * @requires {void}
 */
const getProductPage = async () => {
    const needPage = page.value + 1;
    const response = await apiProduct.getProductPage(needPage);

    if (response.status === false) {
        toolNotify.error("通知", response.message);

        return;
    }

    const productPage = response.data.productPage.data;

    if (productPage.length <= 0) {
        return;
    }

    // 設定商品資料
    productPage.forEach((item) => {
        productData.value.push({
            productId: item.productId,
            photoUrl: item.photoUrl,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            description: item.description,
        });
    });

    page.value = needPage;
};
</script>
