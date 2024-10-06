<template>
    <div class="space-y-2">
        <!-- 搜尋列 -->
        <div class="flex justify-between">
            <el-form :model="form" class="flex space-x-1">
                <el-input v-model="form.keyword" placeholder="請輸入商品名稱" />
                <el-button type="warning" @click="searchProduct" icon="Search">
                    搜尋
                </el-button>
            </el-form>
            <el-button type="success" @click="toAddPage" icon="Plus">
                新增商品
            </el-button>
        </div>
        <!-- 列表 -->
        <el-table
            class="rounded-lg"
            :data="tableData"
            stripe
            border
            empty-text="查無資料"
        >
            <el-table-column prop="name" label="商品名稱" />
            <el-table-column label="商品圖片">
                <template #default="scope">
                    <el-image
                        class="w-24 h-24"
                        :src="scope.row.photoUrl"
                        fit="fill"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="productTypeName" label="商品類型" />
            <el-table-column prop="price" label="價格" />
            <el-table-column prop="quantity" label="數量" />
            <el-table-column prop="startTime" label="上架時間" />
            <el-table-column prop="endTime" label="下架時間" />
            <el-table-column label="狀態">
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.status"
                        @change="editProductStatus(scope.row.productId, $event)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="管理">
                <template #default="scope">
                    <div class="flex flex-col">
                        <el-link
                            class="justify-start"
                            @click="toEditPage(scope.row.productId)"
                            :underline="false"
                            type="primary"
                            icon="Edit"
                        >
                            編輯
                        </el-link>
                        <el-link
                            class="justify-start"
                            @click="toStockPage(scope.row.productId)"
                            :underline="false"
                            type="warning"
                            icon="List"
                        >
                            庫存單管理
                        </el-link>
                        <el-link
                            class="justify-start"
                            @click="deleteProduct(scope.row.productId)"
                            :underline="false"
                            type="danger"
                            icon="Delete"
                        >
                            刪除
                        </el-link>
                    </div>
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
import toolMessage from "@/tool/Message.js";
import * as toolTime from "@/tool/Time.js";
import * as toolStr from "@/tool/Str.js";
import * as apiProduct from "@/api/mgmt/product/Product.js";

const router = useRouter();
const page = ref(1);
const dataTotal = ref(0);
const tableData = ref([]);

const form = reactive({
    keyword: "",
});

onMounted(() => {
    // 取得商品分頁
    getProductPage();

    // 監聽分頁頁碼變更
    watch(page, getProductPage);
});

/**
 * 編輯商品狀態
 *
 * @param {int} productId 商品ID
 * @param {bool} status 商品狀態
 *
 * @returns {void}
 */
const editProductStatus = async (productId, status) => {
    const response = await apiProduct.editProductStatus(productId, status);

    if (response.status === false) {
        toolNotify("error", response.message);
        getProductPage(); // 編輯失敗後重新刷新列表
        return;
    }

    toolNotify("success", response.message);
};

/**
 * 刪除商品
 *
 * @param {int} productId 商品ID
 *
 * @returns {void}
 */
const deleteProduct = async (productId) => {
    const param = {
        type: "confirm",
        message: "確定要刪除商品嗎?",
        agree: async () => {
            const response = await apiProduct.deleteProduct(productId);

            if (response.status === false) {
                toolNotify("error", response.message);
                return;
            }

            toolNotify("success", response.message);
            getProductPage(); // 刪除成功後重新刷新列表
        },
    };

    toolMessage(param);
};

/**
 * 進入新增頁面
 *
 * @returns {void}
 */
const toAddPage = () => {
    router.push({ name: "mgmtProductAdd" });
};

/**
 * 進入編輯頁面
 *
 * @param {int} productId 商品ID
 *
 * @return {void}
 */
const toEditPage = (productId) => {
    const param = {
        productId: productId,
    };

    router.push({
        name: "mgmtProductEdit",
        params: param,
    });
};

/**
 * 進入庫存單管理頁面
 *
 * @param {int} productId 商品ID
 *
 * @return {void}
 */
const toStockPage = (productId) => {
    const param = {
        productId: productId,
    };

    router.push({
        name: "mgmtProductStock",
        params: param,
    });
};

/**
 * 取得商品分頁
 *
 * @returns {void}
 */
const getProductPage = async () => {
    const response = await apiProduct.getProductPage(page.value, form.keyword);

    if (response.status === false) {
        toolNotify("error", response.message);
        return;
    }

    const productPage = response.data.productPage;

    // 設定列表資料
    tableData.value = [];
    productPage.data.forEach((item) => {
        tableData.value.push(setProduct(item));
    });

    // 設定資料總數
    dataTotal.value = productPage.total;
};

/**
 * 搜尋商品
 *
 * @returns {void}
 */
const searchProduct = () => {
    page.value !== 1 ? (page.value = 1) : getProductPage();
};

/**
 * 設定商品資料
 *
 * @param data
 *
 * @returns {object} 商品資料
 */
const setProduct = (data) => {
    const product = {
        productId: data.productId,
        name: data.name,
        photoUrl: data.photoUrl,
        price: toolStr.formatNumber(data.price),
        quantity: data.quantity,
        startTime: toolTime.getDateTime(data.startTime),
        endTime: toolTime.getDateTime(data.endTime),
        status: data.status,
        productTypeName: data.productTypeName,
    };

    return product;
};
</script>
