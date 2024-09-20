<template>
    <div class="space-y-2">
        <el-card v-for="order in orderPage" class="rounded-lg">
            <template #header>
                <span class="text-1xl font-bold">
                    訂單編號：{{ order.code }}
                </span>
            </template>
            <div class="space-y-2">
                <el-steps :active="order.orderStatusId">
                    <el-step
                        v-for="orderStatus in orderStatusList"
                        :title="orderStatus"
                    />
                </el-steps>
                <el-descriptions direction="vertical" column="2" border>
                    <el-descriptions-item label="訂購時間">
                        {{ order.createdTime }}
                    </el-descriptions-item>
                    <el-descriptions-item label="運送方式">
                        {{ order.orderShipName }}
                    </el-descriptions-item>
                    <el-descriptions-item label="付款方式">
                        {{ order.orderPaymentName }}
                    </el-descriptions-item>
                    <el-descriptions-item label="運費">
                        ${{ formatNumber(order.orderShipPrice) }}
                    </el-descriptions-item>
                    <el-descriptions-item label="商品總額">
                        ${{ formatNumber(order.orderProductTotal) }}
                    </el-descriptions-item>
                    <el-descriptions-item label="訂單總額">
                        ${{ formatNumber(order.orderTotal) }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <template #footer>
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
            </template>
        </el-card>
        <el-button
            type="primary"
            class="w-full"
            icon="Goods"
            @click="getOrderPage"
        >
            載入更多
        </el-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import toolNotify from "@/tool/Notify.js";
import { formatNumber } from "@/tool/Str.js";
import { getOrderPage as apiGetOrderPage } from "@/api/shop/order/Order.js";
import * as apiOrderStatus from "@/api/shop/order/OrderStatus.js";

const page = ref(1);
const orderStatusList = ref([]);
const orderPage = ref([]);

onMounted(() => {
    // 取得訂單分頁
    getOrderPage();

    // 取得訂單狀態列表
    getOrderStatusList();
});

/**
 * 取得訂單狀態列表
 *
 * @requires {void}
 */
const getOrderStatusList = async () => {
    const response = await apiOrderStatus.getOrderStatusList();

    if (response.status === false) {
        toolNotify({
            type: "error",
            title: "通知",
            message: response.message,
        });

        return;
    }

    response.data.orderStatusList.forEach((orderStatus) => {
        orderStatusList.value.push(orderStatus.name);
    });
};

/**
 * 取得訂單分頁
 *
 * @requires {void}
 */
const getOrderPage = async () => {
    const response = await apiGetOrderPage(page.value);

    if (response.status === false) {
        toolNotify({
            type: "error",
            title: "通知",
            message: response.message,
        });

        return;
    }

    response.data.orderPage.forEach((order) => {
        orderPage.value.push({
            code: order.code,
            createdTime: order.createdTime,
            orderShipName: order.orderShipName,
            orderPaymentName: order.orderPaymentName,
            orderShipPrice: order.orderShipPrice,
            orderProductTotal: order.orderProductTotal,
            orderTotal: order.orderTotal,
            orderStatusId: order.orderStatusId,
            orderProductList: order.orderProductList,
        });
    });

    page.value++;
};
</script>
