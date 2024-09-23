<template>
    <div class="w-full flex justify-center">
        <div class="w-11/12 space-y-2">
            <div class="flex justify-end">
                <div>
                    <el-button @click="toOrderPage" icon="Back">
                        返回訂單管理
                    </el-button>
                </div>
            </div>
            <el-card class="!rounded-lg">
                <template #header>
                    <span>訂單資訊</span>
                </template>
                <el-descriptions column="2" border>
                    <el-descriptions-item label="訂單編號">
                        {{ order.code }}
                    </el-descriptions-item>
                    <el-descriptions-item label="訂購時間">
                        {{ order.createTime }}
                    </el-descriptions-item>
                    <el-descriptions-item label="運送方式">
                        {{ order.orderShipName }}
                    </el-descriptions-item>
                    <el-descriptions-item label="付款方式">
                        {{ order.orderPaymentName }}
                    </el-descriptions-item>
                    <el-descriptions-item label="地址">
                        {{ order.address }}
                    </el-descriptions-item>
                    <el-descriptions-item label="運費">
                        ${{ order.orderShipPrice }}
                    </el-descriptions-item>
                    <el-descriptions-item label="商品總額">
                        ${{ order.orderProductTotal }}
                    </el-descriptions-item>
                    <el-descriptions-item label="訂單總額">
                        ${{ order.orderTotal }}
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <el-card class="!rounded-lg">
                <template #header>
                    <span>商品明細</span>
                </template>
                <div class="space-y-1">
                    <div
                        v-for="orderProduct in order.orderProductList"
                        class="h-24 border rounded-lg flex"
                    >
                        <div class="h-full w-24 p-1">
                            <img
                                class="h-full w-full rounded-lg"
                                :src="orderProduct.photoUrl"
                            />
                        </div>
                        <div
                            class="flex-auto flex flex-wrap items-center space-x-1"
                        >
                            <div class="text-1xl font-bold">
                                {{ orderProduct.name }}
                            </div>
                            <div class="text-1xl font-bold text-red-600">
                                ${{ formatNumber(orderProduct.price) }}
                            </div>
                            <div>x{{ orderProduct.quantity }}</div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import toolNotify from "@/tool/Notify.js";
import { getDateTime } from "@/tool/Time.js";
import { formatNumber } from "@/tool/Str.js";
import * as apiOrder from "@/api/mgmt/order/Order.js";

const route = useRoute();
const router = useRouter();
const orderId = route.params.orderId;
const order = ref({});

onMounted(() => {
    // 取得訂單
    getOrder();
});

/**
 * 取得訂單資料
 *
 * @return {void}
 */
const getOrder = async () => {
    const response = await apiOrder.getOrder(orderId);

    if (response.status === false) {
        toolNotify("error", response.message);
        toListPage();
        return;
    }

    const orderData = response.data.order;

    setOrder(orderData);
    setOrderProductList(orderData.orderProductList);
};

/**
 * 進入列表頁面
 *
 * @returns {void}
 */
const toOrderPage = () => {
    router.push({ name: "mgmtOrder" });
};

/**
 * 設定訂單
 *
 * @param {object} orderData 訂單資料
 *
 * @returns {void}
 */
const setOrder = (orderData) => {
    order.value = {
        code: orderData.code,
        address: orderData.address,
        orderShipName: orderData.orderShipName,
        orderPaymentName: orderData.orderPaymentName,
        orderShipPrice: formatNumber(orderData.orderShipPrice),
        orderProductTotal: formatNumber(orderData.orderProductTotal),
        orderTotal: formatNumber(orderData.orderTotal),
        orderStatusName: orderData.orderStatusName,
        createTime: getDateTime(orderData.createTime),
    };
};

/**
 * 設定訂單商品
 *
 * @param {object} orderProductList 訂單商品列表
 *
 * @returns {void}
 */
const setOrderProductList = (orderProductList) => {
    const productList = [];
    orderProductList.forEach((product) => {
        productList.push({
            name: product.name,
            photoUrl: product.photoUrl,
            quantity: product.quantity,
            price: product.price,
            total: product.total,
        });
    });

    order.value.orderProductList = productList;
};
</script>
