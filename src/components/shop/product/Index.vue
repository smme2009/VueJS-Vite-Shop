<template>
    <div class="h-80 flex flex-wrap">
        <div class="h-full xs:w-full md:w-2/5 flex justify-center">
            <el-image
                class="h-full rounded-lg"
                :src="productData.photoUrl"
                fit="fill"
            />
        </div>
        <div class="h-full xs:w-full md:w-3/5 flex flex-col space-y-2">
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
                <el-button class="w-1/2" icon="ShoppingCart">
                    加入購物車
                </el-button>
            </div>
        </div>
    </div>
    <div></div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
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

const form = reactive({
    quantity: 1,
});

/**
 * 取得商品資料
 *
 * @requires {void}
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
    };
};

/**
 * 取得優惠券
 *
 * @requires {void}
 */
const getCoupon = () => {
    toolNotify({
        type: "success",
        title: "通知",
        message: "查無可用優惠券",
    });
};
</script>
