<template>
    <div>
        <!-- 搜尋列 -->
        <div class="flex justify-center mt-5">
            <div class="w-11/12 flex justify-between">
                <el-form :model="form" class="flex">
                    <el-input
                        class="mr-1.5"
                        v-model="form.keyword"
                        placeholder="請輸入訂單編號"
                    />
                    <el-button
                        type="warning"
                        @click="searchOrder"
                        icon="Search"
                    >
                        搜尋
                    </el-button>
                </el-form>
            </div>
        </div>
        <!-- 列表 -->
        <div class="flex justify-center mt-2.5">
            <div class="w-11/12">
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
                                class="mr-2"
                                type="primary"
                                icon="Tickets"
                                @click="toInfoPage(scope.row.orderId)"
                            >
                                訂單詳細
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 分頁 -->
        <page />
    </div>
</template>

<script setup>
import page from "@/components/mgmt/public/page/Index.vue";
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import storeBePage from "@/store/backend/page/Index.js";
import toolNotify from "@/tool/Notify.js";
import { getDateTime } from "@/tool/Time.js";
import { formatNumber } from "@/tool/Str.js";
import * as apiOrder from "@/api/mgmt/order/Order.js";

const router = useRouter();
const store = storeBePage();
const tableData = ref([]);

const form = reactive({
    keyword: "",
});

onMounted(() => {
    // 監聽分頁頁碼變更
    watch(() => store.nowPage, getOrderData, { deep: true });

    // 觸發搜尋
    searchOrder();
});

/**
 * 搜尋訂單
 *
 * @returns {void}
 */
const searchOrder = () => {
    // 重設分頁資料
    store.$reset();

    // 取得第一頁資料
    store.nowPage = 1;
};

/**
 * 取得訂單資料
 *
 * @returns {void}
 */
const getOrderData = async () => {
    const response = await apiOrder.getOrderPage(store.nowPage, form.keyword);

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
    store.dataTotal = orderPage.total;
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
