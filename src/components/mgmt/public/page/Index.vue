<template>
    <div class="flex justify-center">
        <el-pagination
            background
            layout="prev,pager,next"
            :current-page="page"
            :default-page-size="pageSize"
            :total="dataTotal"
            @current-change="changePage"
        />
    </div>
</template>

<script setup>
const page = defineModel("page");
const pageSize = 15;
const dataTotal = defineModel("dataTotal");

/**
 * 變更頁碼
 *
 * @returns {void}
 */
const changePage = (pageNumber) => {
    page.value = pageNumber;
};
</script>
