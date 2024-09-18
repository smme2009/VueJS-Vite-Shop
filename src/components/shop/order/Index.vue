<template>
    <div class="space-y-2">
        <ship
            v-model:orderShipId="form.orderShipId"
            v-model:address="form.address"
            v-model:addressErrMsg="formErrMsg.address"
            v-model:orderShipPrice="orderShipPrice"
        />
        <payment v-model="form.orderPaymentId" />
        <product v-model="orderProductTotal" />
        <total
            v-model:orderProductTotal="orderProductTotal"
            v-model:orderShipPrice="orderShipPrice"
        />
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
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import toolNotify from "@/tool/Notify.js";
import { addOrder as apiAddOrder } from "@/api/shop/order/Order.js";

const route = useRoute();
const router = useRouter();

const cartIdList = route.query.cartIdList;
const formErrMsg = ref({});
const orderShipPrice = ref(0);
const orderProductTotal = ref(0);

const form = reactive({
    orderShipId: null,
    address: "",
    orderPaymentId: null,
    cartIdList: cartIdList,
});

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
