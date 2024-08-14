<template>
    <div class="p-1">
        <el-button
            type="primary"
            class="w-full"
            :loading="load"
            @click="getProductPage"
        >
            載入更多
        </el-button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const load = ref(false);

/**
 * 取得商品頁面
 *
 * @requires {void}
 */
const getProductPage = async () => {
    load.value = true;

    await store.dispatch("feProduct/toNextPage");

    load.value = false;
};
</script>
