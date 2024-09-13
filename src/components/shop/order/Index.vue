<template>
    <div class="space-y-2">
        <ship
            v-model:shipType="form.shipType"
            v-model:addressId="form.addressId"
        />
        <payment v-model:="form.paymentType" />
        <product v-model:="productList" />
        <total v-model:="productList" />
    </div>
</template>

<script setup>
import ship from "@/components/shop/order/Ship.vue";
import payment from "@/components/shop/order/Payment.vue";
import product from "@/components/shop/order/Product.vue";
import total from "@/components/shop/order/Total.vue";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import storeFeCart from "@/store/frontend/cart/Index.js";
import toolNotify from "@/tool/Notify.js";

const route = useRoute();
const router = useRouter();
const storeCart = storeFeCart();
const cartIdList = route.query.cartIdList;
const productList = ref([]);

const form = reactive({
    shipType: 1,
    addressId: null,
    paymentType: 1,
});

onMounted(async () => {
    const isSet = await setProductList();

    if (isSet === false) {
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
const setProductList = async () => {
    await storeCart.getMemberCartProductList();

    storeCart.memberData.forEach((cartProduct) => {
        if (cartIdList.includes(cartProduct.cartId.toString()) === false) {
            return;
        }

        if (cartProduct.quantity > cartProduct.productQuantity) {
            return;
        }

        productList.value.push(cartProduct);
    });

    const isSet = cartIdList.length === productList.value.length;

    return isSet;
};
</script>
