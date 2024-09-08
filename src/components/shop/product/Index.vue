<template>
    <div class="min-h-96 flex flex-wrap justify-center">
        <div class="max-w-96 p-1">
            <img class="rounded-lg" :src="productData.photoUrl" />
        </div>
        <div class="flex-auto flex flex-col space-y-2 p-1">
            <div class="text-2xl font-medium">
                {{ productData.name }}
            </div>
            <div class="text-2xl font-medium text-red-600">
                {{ productData.price }}
            </div>
            <div
                class="flex-auto whitespace-pre-wrap truncate bg-slate-100 rounded-lg"
            >
                {{ productData.description }}
            </div>
            <div>
                <el-button type="primary" @click="getCoupon" link>
                    查看優惠券
                </el-button>
            </div>
            <div class="flex">
                <div class="flex items-center">數量：</div>
                <el-input-number
                    v-model="form.quantity"
                    min="1"
                    :max="productData.quantity"
                />
            </div>
            <div class="flex space-x-1">
                <el-button type="primary" class="w-1/2" icon="Goods">
                    直接購買
                </el-button>
                <el-button
                    class="w-1/2"
                    icon="ShoppingCart"
                    @click="editCartProduct"
                >
                    加入購物車
                </el-button>
            </div>
        </div>
    </div>
    <div class="mt-2 p-1">
        <el-tabs type="card">
            <el-tab-pane label="商品介紹" />
        </el-tabs>
    </div>
    <div class="ck-content mt-1 p-1">
        <div v-html="productData.pageHtml" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import storeFeMember from "@/store/frontend/member/Index.js";
import storeFeCart from "@/store/frontend/cart/Index.js";
import toolNotify from "@/tool/Notify.js";
import { formatNumber } from "@/tool/Str.js";
import { getProduct as apiGetProduct } from "@/api/shop/product/Product.js";

onMounted(() => {
    // 取得商品資料
    getProductData();
});

const route = useRoute();
const router = useRouter();
const productId = route.params.productId;
const productData = ref({});
const storeMember = storeFeMember();
const storeCart = storeFeCart();

const form = reactive({
    quantity: 1,
});

/**
 * 取得商品資料
 *
 * @returns {void}
 */
const getProductData = async () => {
    const response = await apiGetProduct(productId);

    if (response.status === false) {
        toolNotify({
            type: "error",
            title: "通知",
            message: response.message,
        });

        router.push({ name: "shopHome" });

        return;
    }

    const product = response.data.product;

    productData.value = {
        productId: product.productId,
        name: product.name,
        photoUrl: product.photoUrl,
        price: "$" + formatNumber(product.price),
        quantity: product.quantity,
        description: product.description,
        pageHtml: product.pageHtml,
    };
};

/**
 * 取得優惠券
 *
 * @returns {void}
 */
const getCoupon = () => {
    toolNotify({
        type: "success",
        title: "通知",
        message: "查無可用優惠券",
    });
};

/**
 * 編輯購物車商品
 *
 * @returns {void}
 */
const editCartProduct = () => {
    const param = {
        productId: productId,
        quantity: 1,
    };

    storeMember.hasToken
        ? storeCart.editMemberCartProduct(param)
        : storeCart.editLocalCartProduct(param);
};
</script>
