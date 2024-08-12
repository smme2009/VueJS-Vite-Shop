<template>
    <div class="w-11/12 flex justify-center mt-5">
        <el-pagination
            background
            layout="prev,pager,next"
            :current-page="store.state.bePage.nowPage"
            :default-page-size="pageSize"
            :total="store.state.bePage.dataTotal"
            @current-change="setNowPage"
        />
    </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

// 單頁資料上限
const pageSize = 15;

/**
 * 設定當前頁碼
 *
 * @param {int} page 頁碼
 *
 * @returns {void}
 */
const setNowPage = (page) => {
    store.commit("bePage/setNowPage", page);
};
</script>
