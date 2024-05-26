<template>
    <div class="flex justify-center mt-2.5">
        <div class="w-11/12">
            <el-table :data="tableData" stripe border empty-text="查無資料">
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
                <el-table-column prop="price" label="價格" />
                <el-table-column prop="quantity" label="數量" />
                <el-table-column prop="startTime" label="上架時間" />
                <el-table-column prop="endTime" label="下架時間" />
                <el-table-column label="狀態">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.status"
                            @change="
                                editProductStatus(scope.row.productId, $event)
                            "
                        />
                    </template>
                </el-table-column>
                <el-table-column label="管理">
                    <template #default="scope">
                        <el-button type="primary" circle>
                            <el-icon>
                                <Edit />
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
</template>

<script setup>
import { ref, watch } from "vue";
import { getDateTime } from "@/tool/Time.js";
import * as toolAlert from "@/tool/Alert.js";
import * as toolMessage from "@/tool/Message.js";
import toolAjax from "@/tool/Ajax.js";

const prop = defineProps(["page", "searchData"]);
const emit = defineEmits(["setDataTotal"]);

// 資料表資料
const tableData = ref([]);

// 初始化時取得首頁商品資料
getProductData();

// 頁碼改變時取得該頁商品資料
watch(prop, () => {
    getProductData();
});

/**
 * 編輯商品狀態
 *
 * @param {int} productId 商品ID
 * @param {bool} status 商品狀態
 *
 * @returns {void}
 */
const editProductStatus = (productId, status) => {
    toolAjax({
        method: "put",
        url: "/product/" + productId + "/status",
        data: {
            status: status,
        },
        then: (response) => {
            toolAlert.success(response.message[0]);
        },
        catch: (response) => {
            toolAlert.error(response.message[0]);

            // 編輯失敗後重新刷新列表
            getProductData();
        },
    });
};

/**
 * 刪除商品
 *
 * @param {int} productId 商品ID
 *
 * @returns {void}
 */
const deleteProduct = (productId) => {
    toolMessage.confirm("確定要刪除商品嗎?", () => {
        toolAjax({
            method: "delete",
            url: "/product/" + productId,
            then: (response) => {
                toolAlert.success(response.message[0]);

                // 刪除成功後重新刷新列表
                getProductData();
            },
            catch: (response) => {
                toolAlert.error(response.message[0]);
            },
        });
    });
};

/**
 * 取得商品資料
 *
 * @returns {void}
 */
function getProductData() {
    toolAjax({
        method: "get",
        url: "/product",
        data: {
            page: prop.page,
            keyword: prop.searchData.keyword,
        },
        then: (response) => {
            const productPage = response.data.productPage;

            // 設定資料表資料
            let productList = [];
            productPage.data.forEach((item) => {
                const product = setProduct(item);

                productList.push(product);
            });

            tableData.value = productList;

            // 設定資料總數
            emit("setDataTotal", productPage.total);
        },
    });
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
        price: data.price,
        quantity: data.quantity,
        startTime: getDateTime(data.startTime),
        endTime: getDateTime(data.endTime),
        status: data.status,
    };

    return product;
}
</script>
