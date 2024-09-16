<template>
    <div class="space-y-2">
        <ship
            v-model:orderShipId="form.orderShipId"
            v-model:address="form.address"
            v-model:addressErrMsg="formErrMsg.address"
        />
        <payment v-model:="form.orderPaymentId" />
        <product v-model:="productList" />
        <total v-model:="productList" />
        <el-button type="primary" class="w-full" icon="Goods" @click="addOrder">
            確認
        </el-button>
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
import { addOrder as apiAddOrder } from "@/api/shop/order/Order.js";

const route = useRoute();
const router = useRouter();
const storeCart = storeFeCart();
const cartIdList = route.query.cartIdList;
const productList = ref([]);
const formErrMsg = ref({});

const form = reactive({
    orderShipId: 1,
    address: "",
    orderPaymentId: 1,
    cartIdList: cartIdList,
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

/**
 * 新增訂單
 *
 * @returns {void}
 */
const addOrder = async () => {
    const response = await apiAddOrder(form);

    if (response.status === false) {
        toolNotify({
            type: "error",
            title: "通知",
            message: response.message,
        });

        response.data.forEach((error) => {
            formErrMsg.value[error.name] = error.message.join("、");
        });

        return;
    }

    toolNotify({
        type: "success",
        title: "通知",
        message: "成功新增訂單",
    });

    router.push({ name: "shopCart" });
};
</script>
