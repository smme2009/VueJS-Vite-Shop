<template>
    <div>
        <!-- 資訊列 -->
        <div class="flex justify-center mt-5">
            <div class="w-11/12 flex justify-start space-x-2">
                <el-card class="w-1/4 text-lg !rounded-lg">
                    <b>商品名稱：{{ product.name }}</b>
                </el-card>
                <el-card class="w-1/4 text-lg !rounded-lg">
                    <b>庫存數量：{{ product.quantity }}</b>
                </el-card>
            </div>
        </div>
        <!-- 搜尋列 -->
        <div class="flex justify-center mt-5">
            <div class="w-11/12 flex justify-end">
                <div>
                    <el-button @click="toProductPage" icon="Back">
                        返回商品管理
                    </el-button>
                    <el-button type="success" @click="toAddPage" icon="Plus">
                        新增庫存單
                    </el-button>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="flex justify-center mt-2.5">
            <div class="w-11/12">
                <el-table
                    class="rounded-lg"
                    :data="tableData"
                    border
                    empty-text="查無資料"
                    :row-class-name="setRowClass"
                >
                    <el-table-column
                        prop="productStockTypeName"
                        label="庫存單類型"
                    />
                    <el-table-column prop="quantity" label="數量" />
                    <el-table-column prop="createTime" label="新增時間" />
                </el-table>
            </div>
        </div>
        <!-- 分頁 -->
        <page />
    </div>
</template>

<script setup>
import page from "@/components/mgmt/public/page/Index.vue";
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import * as toolNotify from "@/tool/Notify.js";
import * as toolTime from "@/tool/Time.js";
import * as apiProduct from "@/api/mgmt/product/Product.js";
import * as apiProductStock from "@/api/mgmt/product/ProductStock.js";

const route = useRoute();
const router = useRouter();
const store = useStore();

const tableData = ref([]);
const product = ref({});

const productId = route.params.productId;

onMounted(() => {
    // 初始化時取得商品資料
    getProduct();

    // 初始化時取得商品庫存單資料
    getProductStockData();

    // 監聽當前頁碼
    watch(() => store.state.page.nowPage, getProductStockData);
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
 * 取得商品庫存單資料
 *
 * @returns {void}
 */
const getProductStockData = async () => {
    const response = await apiProductStock.getProductStockPage(
        productId,
        store.state.page.nowPage
    );

    if (response.status) {
        const productStockPage = response.data.productStockPage;

        // 設定列表資料
        tableData.value = [];
        productStockPage.data.forEach((item) => {
            tableData.value.push(setProductStock(item));
        });

        // 設定資料總數
        store.commit("page/setDataTotal", productStockPage.total);
    } else {
        toolNotify.error("通知", response.message);
    }
};

/**
 * 取得商品資料
 *
 * @return {void}
 */
const getProduct = async () => {
    const response = await apiProduct.getProduct(productId);

    if (response.status) {
        product.value = response.data.product;
    } else {
        toolNotify.error("通知", response.message);
    }
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
