<template>
    <div class="w-11/12 flex justify-center mt-5">
        <el-pagination
            background
            layout="prev, pager, next"
            default-page-size="15"
            :total="dataTotal"
            hide-on-single-page="true"
            @current-change="setPage"
        />
    </div>
</template>

<script setup>
const prop = defineProps(["dataTotal"]);
const emit = defineEmits(["setPage"]);

/**
 * 設定頁碼
 *
 * @param {int} page 現在頁碼
 *
 * @returns {void}
 */
const setPage = (page) => {
    emit("setPage", page);
};
</script>
