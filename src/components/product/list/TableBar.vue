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
                    <el-icon>
                        <Search />
                    </el-icon>
                </el-button>
            </div>
            <div>
                <el-button type="success">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
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
</script>
