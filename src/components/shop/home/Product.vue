<template>
    <div class="flex flex-wrap justify-start" v-loading="load">
        <div
            v-for="product in productPage"
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
    <div class="p-1">
        <el-button
            type="primary"
            class="w-full"
            :loading="load"
            @click="getProductPage"
        >
            載入更多
        </el-button>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import storeFeSearch from "@/store/frontend/search/Index.js";
import storeFeMember from "@/store/frontend/member/Index.js";
import storeFeCart from "@/store/frontend/cart/Index.js";
import toolNotify from "@/tool/Notify.js";
import { formatNumber } from "@/tool/Str.js";
import * as apiProduct from "@/api/shop/product/Product.js";

const router = useRouter();
const storeSearch = storeFeSearch();
const storeMember = storeFeMember();
const storeCart = storeFeCart();
const productTypeId = defineModel();
const load = ref(true);
const page = ref(1);
const productPage = ref([]);

onMounted(() => {
    // 設定搜尋列
    storeSearch.$reset();
    storeSearch.setTitle("請輸入商品名稱");
    storeSearch.setSearchFunction(() => getProductPage(true));

    // 取得分頁資料
    getProductPage();

    // 監聽所選的商品類型並取得分頁資料
    watch(productTypeId, () => getProductPage(true));
});

/**
 * 取得商品分頁
 *
 * @param {bool} isReset 是否重設資料
 *
 * @returns {void}
 */
const getProductPage = async (isReset = false) => {
    load.value = true;

    const needPage = isReset === true ? 1 : page.value;
    const oldData = productPage.value;

    const searchData = {
        keyword: storeSearch.keyword,
        productTypeId: productTypeId.value,
    };

    const response = await apiProduct.getProductPage(needPage, searchData);

    if (response.status === false) {
        toolNotify("error", response.message);
        return;
    }

    const pageData = [];
    response.data.productPage.data.forEach((product) => {
        pageData.push({
            productId: product.productId,
            photoUrl: product.photoUrl,
            name: product.name,
            price: formatNumber(product.price),
            quantity: product.quantity,
            description: product.description,
        });
    });

    // 若在起頭就根據isReset重設資料，畫面呈現的方式會不佳，所以統一放到結尾執行
    productPage.value = isReset === true ? pageData : oldData.concat(pageData);
    page.value = pageData.length === 0 ? needPage : needPage + 1;
    load.value = false;
};

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
