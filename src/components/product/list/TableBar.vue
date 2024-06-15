<template>
    <div class="flex justify-center mt-5">
        <div class="w-11/12 flex justify-between">
            <div class="flex">
                <el-input
                    class="mr-1.5"
                    v-model="keyword"
                    placeholder="請輸入商品名稱"
                />
                <el-button type="warning" @click="setSearchData">
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
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["setSearchData"]);

// 搜尋資料
const keyword = defineModel("");

/**
 * 設定搜尋資料
 *
 * @returns {void}
 */
const setSearchData = () => {
    const searchData = {
        keyword: keyword.value,
    };

    emit("setSearchData", searchData);
};

/**
 * 進入新增頁面
 *
 * @returns {void}
 */
const toAddPage = () => {
    router.push("/mgmt/product/add");
};
</script>
