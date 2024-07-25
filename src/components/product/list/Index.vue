<template>
    <div>
        <!-- 搜尋列 -->
        <div class="flex justify-center mt-5">
            <div class="w-11/12 flex justify-between">
                <div class="flex">
                    <el-input
                        class="mr-1.5"
                        v-model="keyword"
                        placeholder="請輸入商品名稱"
                    />
                    <el-button type="warning" @click="searchProduct">
                        搜尋
                    </el-button>
                </div>
                <div>
                    <el-button type="success" @click="toAddPage">
                        新增商品
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
                                @change="
                                    editProductStatus(
                                        scope.row.productId,
                                        $event
                                    )
                                "
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="管理">
                        <template #default="scope">
                            <el-button
                                @click="toEditPage(scope.row.productId)"
                                type="primary"
                                circle
                            >
                                <el-icon>
                                    <Edit />
                                </el-icon>
                            </el-button>
                            <el-button
                                @click="toStockPage(scope.row.productId)"
                                type="warning"
                                circle
                            >
                                <el-icon>
                                    <List />
                                </el-icon>
                            </el-button>
                            <el-button
                                @click="deleteProduct(scope.row.productId)"
                                type="danger"
                                circle
                            >
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 分頁 -->
        <div class="w-11/12 flex justify-center mt-5">
            <el-pagination
                background
                layout="prev,pager,next"
                :default-page-size="15"
                :total="dataTotal"
                hide-on-single-page="true"
                @current-change="searchProduct"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import * as toolNotify from "@/tool/Notify.js";
import * as toolMessage from "@/tool/Message.js";
import * as toolTime from "@/tool/Time.js";
import * as toolStr from "@/tool/Str.js";
import * as apiProduct from "@/api/Product.js";

const router = useRouter();

const tableData = ref([]);
const nowPage = ref(1);
const dataTotal = ref(0);

const keyword = defineModel("");

// 初始化時取得首頁商品資料
getProductData();

/**
 * 搜尋商品
 *
 * @param {int} page 頁碼
 *
 * @returns {void}
 */
const searchProduct = (page = 1) => {
    nowPage.value = page;

    getProductData();
};

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

    if (response.status) {
        toolNotify.success("通知", response.message);
    } else {
        toolNotify.error("通知", response.message, false);

        // 編輯失敗後重新刷新列表
        getProductData();
    }
};

/**
 * 刪除商品
 *
 * @param {int} productId 商品ID
 *
 * @returns {void}
 */
const deleteProduct = async (productId) => {
    toolMessage.confirm("確定要刪除商品嗎?", async () => {
        const response = await apiProduct.deleteProduct(productId);

        if (response.status) {
            toolNotify.success("通知", response.message);

            // 刪除成功後重新刷新列表
            getProductData();
        } else {
            toolNotify.error("通知", response.message);
        }
    });
};

/**
 * 進入新增頁面
 *
 * @returns {void}
 */
const toAddPage = () => {
    router.push("/mgmt/product/add");
};

/**
 * 進入編輯頁面
 *
 * @param {int} productId 商品ID
 *
 * @return {void}
 */
const toEditPage = (productId) => {
    router.push(`/mgmt/product/edit/${productId}`);
};

/**
 * 進入庫存單管理頁面
 *
 * @param {int} productId 商品ID
 *
 * @return {void}
 */
const toStockPage = (productId) => {
    router.push(`/mgmt/product/stock/${productId}`);
};

/**
 * 取得商品資料
 *
 * @returns {void}
 */
async function getProductData() {
    const response = await apiProduct.getProductPage(
        nowPage.value,
        keyword.value
    );

    if (response.status) {
        const productPage = response.data.productPage;

        // 設定列表資料
        tableData.value = [];
        productPage.data.forEach((item) => {
            tableData.value.push(setProduct(item));
        });

        // 設定資料總數
        dataTotal.value = productPage.total;
    } else {
        toolNotify.error("通知", response.message);
    }
}

/**
 * 設定商品資料
 *
 * @param data
 *
 * @returns {object} 商品資料
 */
function setProduct(data) {
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
}
</script>
