<template>
    <div class="flex flex-wrap justify-start" v-loading="storeProduct.load">
        <div
            v-for="product in storeProduct.data"
            class="xs:w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/4 2xl:w-1/5 p-1"
        >
            <el-card
                class="h-full !rounded-lg"
                body-class="h-full flex flex-col p-0"
            >
                <div
                    class="flex-auto"
                    @click="toProductPage(product.productId)"
                >
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
                            <el-button
                                icon="Goods"
                                @click="toProductPage(product.productId)"
                            />
                        </el-tooltip>
                        <el-tooltip content="加入購物車">
                            <el-button
                                icon="ShoppingCart"
                                @click="editCartProduct(product.productId)"
                            />
                        </el-tooltip>
                    </el-button-group>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import storeFeProduct from "@/store/frontend/product/Index.js";
import storeFeMember from "@/store/frontend/member/Index.js";
import storeFeCart from "@/store/frontend/cart/Index.js";

const router = useRouter();
const storeProduct = storeFeProduct();
const storeMember = storeFeMember();
const storeCart = storeFeCart();

onMounted(() => {
    // 重設商品資料
    storeProduct.$reset();

    // 搜尋商品資料
    storeProduct.getNextPage();
});

/**
 * 跳轉至商品頁面
 *
 * @param productId 商品ID
 *
 * @returns {void}
 */
const toProductPage = (productId) => {
    const param = {
        productId: productId,
    };

    router.push({
        name: "shopProduct",
        params: param,
    });
};

/**
 * 編輯購物車商品
 *
 * @param {int} productId 商品ID
 *
 * @returns {void}
 */
const editCartProduct = (productId) => {
    const param = {
        productId: productId,
        quantity: 1,
    };

    storeMember.hasToken
        ? storeCart.editMemberCartProduct(param)
        : storeCart.editLocalCartProduct(param);
};
</script>
