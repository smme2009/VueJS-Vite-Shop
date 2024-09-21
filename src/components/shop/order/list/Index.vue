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
import storeFeSearch from "@/store/frontend/search/Index.js";
import toolNotify from "@/tool/Notify.js";
import { formatNumber } from "@/tool/Str.js";
import { getOrderPage as apiGetOrderPage } from "@/api/shop/order/Order.js";
import * as apiOrderStatus from "@/api/shop/order/OrderStatus.js";

const storeSearch = storeFeSearch();
const page = ref(1);
const orderPage = ref([]);
const orderStatusList = ref([]);

onMounted(() => {
    // 設定搜尋列
    storeSearch.$reset();
    storeSearch.setTitle("請輸入訂單編號");
    storeSearch.setSearchFunction(() => getOrderPage(true));

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
 * @param {bool} isReset 是否重置資料
 *
 * @return {void}
 */
const getOrderPage = async (isReset = false) => {
    const oldData = orderPage.value;
    const needPage = isReset === true ? 1 : page.value;
    const keyword = storeSearch.keyword;
    const response = await apiGetOrderPage(needPage, keyword);

    if (response.status === false) {
        toolNotify({
            type: "error",
            title: "通知",
            message: response.message,
        });

        return;
    }

    const pageData = [];
    response.data.orderPage.forEach((order) => {
        pageData.push({
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

    // 若在起頭就根據isReset重設資料，畫面呈現的方式會不佳，所以統一放到結尾執行
    orderPage.value = isReset === true ? pageData : oldData.concat(pageData);
    page.value = pageData.length === 0 ? needPage : needPage + 1;
};
</script>
