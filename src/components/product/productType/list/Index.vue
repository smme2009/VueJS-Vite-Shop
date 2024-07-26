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
                    <el-button type="warning" @click="searchProductType">
                        搜尋
                    </el-button>
                </div>
                <div>
                    <el-button type="success" @click="toAddPage">
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
                            <el-button
                                @click="toEditPage(scope.row.productTypeId)"
                                type="primary"
                                circle
                            >
                                <el-icon>
                                    <Edit />
                                </el-icon>
                            </el-button>
                            <el-button
                                @click="
                                    deleteProductType(scope.row.productTypeId)
                                "
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
                @current-change="searchProductType"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import * as toolNotify from "@/tool/Notify.js";
import * as toolMessage from "@/tool/Message.js";
import * as apiProductType from "@/api/product/ProductType.js";

const router = useRouter();

const tableData = ref([]);
const nowPage = ref(1);
const dataTotal = ref(0);

const keyword = defineModel("");

// 初始化時取得首頁商品類型資料
getProductTypeData();

/**
 * 搜尋商品類型
 *
 * @param {int} page 頁碼
 *
 * @returns {void}
 */
const searchProductType = (page = 1) => {
    nowPage.value = page;

    getProductTypeData();
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
async function getProductTypeData() {
    const response = await apiProductType.getProductTypePage(
        nowPage.value,
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
        dataTotal.value = productTypePage.total;
    } else {
        toolNotify.error("通知", response.message);
    }
}

/**
 * 設定商品類型資料
 *
 * @param data
 *
 * @returns {object} 商品類型資料
 */
function setProductType(data) {
    const productType = {
        productTypeId: data.productTypeId,
        name: data.name,
        status: data.status,
    };

    return productType;
}
</script>
