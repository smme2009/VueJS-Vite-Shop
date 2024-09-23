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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import storeFeCart from "@/store/frontend/cart/Index.js";
import { formatNumber } from "@/tool/Str.js";

const route = useRoute();
const storeCart = storeFeCart();
const orderProductTotal = defineModel();
const productList = ref([]);
const cartIdList = route.query.cartIdList;

onMounted(async () => {
    const isGet = await getProductList();

    if (isGet === false) {
        toolNotify({
            type: "error",
            title: "通知",
            message: "請重新選擇商品",
        });

        router.push({ name: "shopCart" });
    }
});

/**
 * 設定商品列表
 *
 * @returns {bool}
 */
const getProductList = async () => {
    await storeCart.getMemberCartProductList();

    let total = 0;
    storeCart.memberData.forEach((cartProduct) => {
        if (cartIdList.includes(cartProduct.cartId.toString()) === false) {
            return;
        }

        if (cartProduct.quantity > cartProduct.productQuantity) {
            return;
        }

        total += cartProduct.productPrice * cartProduct.quantity;
        productList.value.push(cartProduct);
    });

    // 在迴圈中使用+=不會有加總效果，不確定問題，故先加總完成再賦值
    orderProductTotal.value = total;

    const isGet = cartIdList.length === productList.value.length;

    return isGet;
};
</script>
