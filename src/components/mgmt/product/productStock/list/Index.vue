<template>
    <div class="space-y-2">
        <!-- 資訊列 -->
        <div class="flex justify-start space-x-1">
            <el-card class="w-1/4 text-lg rounded-lg">
                <b>商品名稱：{{ product.name }}</b>
            </el-card>
            <el-card class="w-1/4 text-lg rounded-lg">
                <b>庫存數量：{{ product.quantity }}</b>
            </el-card>
        </div>
        <!-- 搜尋列 -->
        <div class="flex justify-end space-x-1">
            <el-button @click="toProductPage" icon="Back">
                返回商品管理
            </el-button>
            <el-button type="success" @click="toAddPage" icon="Plus">
                新增庫存單
            </el-button>
        </div>
        <!-- 列表 -->
        <el-table
            class="rounded-lg"
            :data="tableData"
            border
            empty-text="查無資料"
            :row-class-name="setRowClass"
        >
            <el-table-column prop="productStockTypeName" label="庫存單類型" />
            <el-table-column prop="quantity" label="數量" />
            <el-table-column prop="createTime" label="新增時間" />
        </el-table>
        <!-- 分頁 -->
        <compPage v-model:page="page" v-model:dataTotal="dataTotal" />
    </div>
</template>

<script setup>
import compPage from "@/components/mgmt/public/page/Index.vue";
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import toolNotify from "@/tool/Notify.js";
import * as toolTime from "@/tool/Time.js";
import * as apiProduct from "@/api/mgmt/product/Product.js";
import * as apiProductStock from "@/api/mgmt/product/ProductStock.js";

const route = useRoute();
const router = useRouter();
const page = ref(1);
const dataTotal = ref(0);
const tableData = ref([]);
const product = ref({});
const productId = route.params.productId;

onMounted(() => {
    // 初始化時取得商品資料
    getProduct();

    // 取得分頁資料
    getProductStockPage();

    // 監聽分頁頁碼變更
    watch(page, getProductStockPage);
});

/**
 * 進入新增頁面
 *
 * @returns {void}
 */
const toAddPage = () => {
    const param = {
        productId: productId,
    };

    router.push({
        name: "mgmtProductStockAdd",
        param: param,
    });
};

/**
 * 進入商品管理頁面
 *
 * @returns {void}
 */
const toProductPage = () => {
    router.push({ name: "mgmtProduct" });
};

/**
 * 設定每一列的Class
 *
 * @param {object} row 列資料
 *
 * @return {string} Class名稱
 */
const setRowClass = (row) => {
    const productStockTypeId = row.row.productStockTypeId;

    const color = {
        1: "!bg-green-100",
        2: "!bg-red-100",
    };

    const className = color[productStockTypeId] ?? "";

    return className;
};

/**
 * 取得商品庫存單分頁
 *
 * @returns {void}
 */
const getProductStockPage = async () => {
    const response = await apiProductStock.getProductStockPage(
        productId,
        page.value
    );

    if (response.status === false) {
        toolNotify("error", response.message);
        return;
    }

    const productStockPage = response.data.productStockPage;

    // 設定列表資料
    tableData.value = [];
    productStockPage.data.forEach((item) => {
        tableData.value.push(setProductStock(item));
    });

    // 設定資料總數
    dataTotal.value = productStockPage.total;
};

/**
 * 取得商品資料
 *
 * @return {void}
 */
const getProduct = async () => {
    const response = await apiProduct.getProduct(productId);

    if (response.status === false) {
        toolNotify("error", response.message);
        return;
    }

    product.value = response.data.product;
};

/**
 * 設定商品庫存單資料
 *
 * @param data
 *
 * @returns {object} 商品庫存單資料
 */
const setProductStock = (data) => {
    const productStock = {
        productStockId: data.productStockId,
        productStockTypeId: data.productStockTypeId,
        productStockTypeName: data.productStockTypeName,
        quantity: data.quantity,
        createTime: toolTime.getDateTime(data.createTime),
    };

    return productStock;
};
</script>
