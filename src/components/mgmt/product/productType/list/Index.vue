<template>
    <div class="space-y-2">
        <!-- 搜尋列 -->
        <div class="flex justify-between">
            <el-form :model="form" class="flex space-x-1">
                <el-input
                    v-model="form.keyword"
                    placeholder="請輸入商品類型名稱"
                />
                <el-button
                    type="warning"
                    @click="searchProductType"
                    icon="Search"
                >
                    搜尋
                </el-button>
            </el-form>
            <el-button type="success" @click="toAddPage" icon="Plus">
                新增商品類型
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
                    <div class="flex flex-col">
                        <el-link
                            class="justify-start"
                            @click="toEditPage(scope.row.productTypeId)"
                            :underline="false"
                            type="primary"
                            icon="Edit"
                        >
                            編輯
                        </el-link>
                        <el-link
                            class="justify-start"
                            @click="deleteProductType(scope.row.productTypeId)"
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
import * as apiProductType from "@/api/mgmt/product/ProductType.js";

const router = useRouter();
const page = ref(1);
const dataTotal = ref(0);
const tableData = ref([]);

const form = reactive({
    keyword: "",
});

onMounted(() => {
    // 取得商品類型分頁
    getProductTypePage();

    // 監聽分頁頁碼變更
    watch(page, getProductTypePage);
});

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

    if (response.status === false) {
        toolNotify("error", response.message);
        getProductTypePage(); // 編輯失敗後重新刷新列表
        return;
    }

    toolNotify("success", response.message);
};

/**
 * 刪除商品類型
 *
 * @param {int} productTypeId 商品類型ID
 *
 * @returns {void}
 */
const deleteProductType = async (productTypeId) => {
    const param = {
        type: "confirm",
        message: "確定要刪除商品類型嗎?",
        agree: async () => {
            const response = await apiProductType.deleteProductType(
                productTypeId
            );

            if (response.status === false) {
                toolNotify("error", response.message);
                return;
            }

            toolNotify("success", response.message);
            getProductTypePage(); // 刪除成功後重新刷新列表
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
 * 取得商品類型分頁
 *
 * @returns {void}
 */
const getProductTypePage = async () => {
    const response = await apiProductType.getProductTypePage(
        page.value,
        form.keyword
    );

    if (response.status === false) {
        toolNotify("error", response.message);
        return;
    }

    const productTypePage = response.data.productTypePage;

    // 設定列表資料
    tableData.value = [];
    productTypePage.data.forEach((item) => {
        tableData.value.push(setProductType(item));
    });

    // 設定資料總數
    dataTotal.value = productTypePage.total;
};

/**
 * 搜尋商品類型
 *
 * @returns {void}
 */
const searchProductType = () => {
    page.value !== 1 ? (page.value = 1) : getProductTypePage();
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
