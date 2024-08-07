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
                    <el-button
                        type="warning"
                        @click="searchProduct"
                        icon="Search"
                    >
                        搜尋
                    </el-button>
                </div>
                <div>
                    <el-button type="success" @click="toAddPage" icon="Plus">
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
                            <el-link
                                class="mr-2"
                                @click="toEditPage(scope.row.productId)"
                                type="primary"
                                icon="Edit"
                            >
                                編輯
                            </el-link>
                            <el-link
                                class="mr-2"
                                @click="toStockPage(scope.row.productId)"
                                type="warning"
                                icon="List"
                            >
                                庫存單管理
                            </el-link>
                            <el-link
                                class="mr-2"
                                @click="deleteProduct(scope.row.productId)"
                                type="danger"
                                icon="Delete"
                            >
                                刪除
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
import page from "@/components/public/page/Index.vue";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as toolNotify from "@/tool/Notify.js";
import * as toolMessage from "@/tool/Message.js";
import * as toolTime from "@/tool/Time.js";
import * as toolStr from "@/tool/Str.js";
import * as apiProduct from "@/api/product/Product.js";

const router = useRouter();
const store = useStore();

const tableData = ref([]);
const keyword = defineModel("");

onMounted(() => {
    // 重設分頁資料
    store.commit("page/setNowPage", 1);

    // 初始化產品資料
    getProductData();

    // 監聽當前頁碼
    watch(() => store.state.page.nowPage, getProductData);
});

/**
 * 搜尋商品
 *
 * @returns {void}
 */
const searchProduct = () => {
    if (store.state.page.nowPage === 1) {
        // 直接取得資料
        getProductData();
    } else {
        // 透過換頁取得資料
        store.commit("page/setNowPage", 1);
    }
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
 * 取得商品資料
 *
 * @returns {void}
 */
const getProductData = async () => {
    const response = await apiProduct.getProductPage(
        store.state.page.nowPage,
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
        store.commit("page/setDataTotal", productPage.total);
    } else {
        toolNotify.error("通知", response.message);
    }
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
