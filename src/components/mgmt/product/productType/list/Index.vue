<template>
    <div>
        <!-- 搜尋列 -->
        <div class="flex justify-center mt-5">
            <div class="w-11/12 flex justify-between">
                <div class="flex">
                    <el-input
                        class="mr-1.5"
                        v-model="keyword"
                        placeholder="請輸入商品類型名稱"
                    />
                    <el-button
                        type="warning"
                        @click="searchProductType"
                        icon="Search"
                    >
                        搜尋
                    </el-button>
                </div>
                <div>
                    <el-button type="success" @click="toAddPage" icon="Plus">
                        新增商品類型
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
                    <el-table-column prop="name" label="商品類型名稱" />
                    <el-table-column label="狀態">
                        <template #default="scope">
                            <el-switch
                                v-model="scope.row.status"
                                @change="
                                    editProductTypeStatus(
                                        scope.row.productTypeId,
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
                                @click="toEditPage(scope.row.productTypeId)"
                                type="primary"
                                icon="Edit"
                            >
                                編輯
                            </el-link>
                            <el-link
                                class="mr-2"
                                @click="
                                    deleteProductType(scope.row.productTypeId)
                                "
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
import page from "@/components/mgmt/public/page/Index.vue";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as toolNotify from "@/tool/Notify.js";
import * as toolMessage from "@/tool/Message.js";
import * as apiProductType from "@/api/product/ProductType.js";

const router = useRouter();
const store = useStore();

const tableData = ref([]);
const keyword = defineModel("");

onMounted(() => {
    // 重設分頁資料
    store.commit("page/setNowPage", 1);

    // 初始化時取得首頁商品類型資料
    getProductTypeData();

    // 監聽當前頁碼
    watch(() => store.state.page.nowPage, getProductTypeData);
});

/**
 * 搜尋商品類型
 *
 * @returns {void}
 */
const searchProductType = () => {
    if (store.state.page.nowPage === 1) {
        // 直接取得資料
        getProductTypeData();
    } else {
        // 透過換頁取得資料
        store.commit("page/setNowPage", 1);
    }
};

/**
 * 編輯商品類型狀態
 *
 * @param {int} productTypeId 商品類型ID
 * @param {bool} status 商品類型狀態
 *
 * @returns {void}
 */
const editProductTypeStatus = async (productTypeId, status) => {
    const response = await apiProductType.editProductTypeStatus(
        productTypeId,
        status
    );

    if (response.status) {
        toolNotify.success("通知", response.message);
    } else {
        toolNotify.error("通知", response.message, false);

        // 編輯失敗後重新刷新列表
        getProductTypeData();
    }
};

/**
 * 刪除商品類型
 *
 * @param {int} productTypeId 商品類型ID
 *
 * @returns {void}
 */
const deleteProductType = async (productTypeId) => {
    toolMessage.confirm("確定要刪除商品類型嗎?", async () => {
        const response = await apiProductType.deleteProductType(productTypeId);

        if (response.status) {
            toolNotify.success("通知", response.message);

            // 刪除成功後重新刷新列表
            getProductTypeData();
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
    router.push({ name: "mgmtProductTypeAdd" });
};

/**
 * 進入編輯頁面
 *
 * @param {int} productTypeId 商品類型ID
 *
 * @return {void}
 */
const toEditPage = (productTypeId) => {
    const param = {
        productTypeId: productTypeId,
    };

    router.push({
        name: "mgmtProductTypeEdit",
        params: param,
    });
};

/**
 * 取得商品類型資料
 *
 * @returns {void}
 */
const getProductTypeData = async () => {
    const response = await apiProductType.getProductTypePage(
        store.state.page.nowPage,
        keyword.value
    );

    if (response.status) {
        const productTypePage = response.data.productTypePage;

        // 設定列表資料
        tableData.value = [];
        productTypePage.data.forEach((item) => {
            tableData.value.push(setProductType(item));
        });

        // 設定資料總數
        store.commit("page/setDataTotal", productTypePage.total);
    } else {
        toolNotify.error("通知", response.message);
    }
};

/**
 * 設定商品類型資料
 *
 * @param data
 *
 * @returns {object} 商品類型資料
 */
const setProductType = (data) => {
    const productType = {
        productTypeId: data.productTypeId,
        name: data.name,
        status: data.status,
    };

    return productType;
};
</script>
