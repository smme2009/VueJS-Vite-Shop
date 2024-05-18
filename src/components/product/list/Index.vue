<template>
    <div>
        <TableBar @setSearchData="setSearchData" />
        <Table
            :page="page"
            :searchData="searchData"
            @setDataTotal="setDataTotal"
        />
        <Page :dataTotal="dataTotal" @setPage="setPage" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import Table from "@/components/product/list/Table.vue";
import TableBar from "@/components/product/list/TableBar.vue";
import Page from "@/components/product/list/Page.vue";

const page = ref(1); // 頁碼
const dataTotal = ref(0); // 資料總數
const searchData = ref([]); // 搜尋資料

/**
 * 設定頁碼
 *
 * @param {int} cPage 頁碼
 *
 * @returns {void}
 */
const setPage = (cPage) => {
    page.value = cPage;
};

/**
 * 設定資料總數
 *
 * @param {int} cDataTotal
 *
 * @returns {void}
 */
const setDataTotal = (cDataTotal) => {
    dataTotal.value = cDataTotal;
};

/**
 * 設定搜尋資料
 *
 * @param {object} cSearchData 搜尋資料
 *
 * @returns {void}
 */
const setSearchData = (cSearchData) => {
    searchData.value = cSearchData;
};
</script>
