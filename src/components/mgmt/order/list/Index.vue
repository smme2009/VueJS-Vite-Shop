<template>
    <div class="space-y-2">
        <!-- 搜尋列 -->
        <div class="flex justify-between">
            <el-form :model="form" class="flex space-x-1">
                <el-input v-model="form.keyword" placeholder="請輸入訂單編號" />
                <el-button type="warning" @click="searchOrder" icon="Search">
                    搜尋
                </el-button>
            </el-form>
        </div>
        <!-- 列表 -->
        <el-table
            class="rounded-lg"
            :data="tableData"
            stripe
            border
            empty-text="查無資料"
        >
            <el-table-column prop="code" label="訂單編號" />
            <el-table-column prop="orderShipName" label="運送方式" />
            <el-table-column prop="orderPaymentName" label="付款方式" />
            <el-table-column prop="orderTotal" label="訂單總額" />
            <el-table-column prop="orderStatusName" label="訂單狀態" />
            <el-table-column prop="createTime" label="訂單成立時間" />
            <el-table-column label="管理">
                <template #default="scope">
                    <el-link
                        @click="toInfoPage(scope.row.orderId)"
                        :underline="false"
                        type="primary"
                        icon="Tickets"
                    >
                        訂單詳細
                    </el-link>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分頁 -->
        <compPage v-model:page="page" v-model:dataTotal="dataTotal" />
    </div>
</template>

<script setup>
import compPage from "@/components/mgmt/public/page/Index.vue";
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import toolNotify from "@/tool/Notify.js";
import { getDateTime } from "@/tool/Time.js";
import { formatNumber } from "@/tool/Str.js";
import * as apiOrder from "@/api/mgmt/order/Order.js";

const router = useRouter();
const page = ref(1);
const dataTotal = ref(0);
const tableData = ref([]);

const form = reactive({
    keyword: "",
});

onMounted(() => {
    // 取得訂單分頁
    getOrderPage();

    // 監聽分頁頁碼變更
    watch(page, getOrderPage);
});

/**
 * 取得訂單分頁
 *
 * @returns {void}
 */
const getOrderPage = async () => {
    const response = await apiOrder.getOrderPage(page.value, form.keyword);

    if (response.status === false) {
        toolNotify("error", response.message);
        return;
    }

    const orderPage = response.data.orderPage;

    // 設定列表資料
    tableData.value = [];
    orderPage.data.forEach((item) => {
        tableData.value.push({
            orderId: item.orderId,
            code: item.code,
            createTime: getDateTime(item.createTime),
            orderStatusName: item.orderStatusName,
            orderShipName: item.orderShipName,
            orderPaymentName: item.orderPaymentName,
            orderTotal: formatNumber(item.orderTotal),
        });
    });

    // 設定資料總數
    dataTotal.value = orderPage.total;
};

/**
 * 搜尋訂單
 *
 * @returns {void}
 */
const searchOrder = () => {
    page.value !== 1 ? (page.value = 1) : getOrderPage();
};

/**
 * 跳轉至訂單資訊頁面
 *
 * @param {int} orderId 訂單ID
 *
 * @returns {void}
 */
const toInfoPage = (orderId) => {
    const param = {
        orderId: orderId,
    };

    router.push({
        name: "mgmtOrderInfo",
        params: param,
    });
};
</script>
