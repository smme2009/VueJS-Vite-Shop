<template>
    <div class="space-y-2">
        <!-- 搜尋列 -->
        <div class="flex justify-between">
            <el-form :model="form" class="flex space-x-1">
                <el-input v-model="form.keyword" placeholder="請輸入橫幅名稱" />
                <el-button type="warning" @click="searchBanner" icon="Search">
                    搜尋
                </el-button>
            </el-form>
            <el-button type="success" @click="toAddPage" icon="Plus">
                新增橫幅
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
            <el-table-column prop="name" label="橫幅名稱" />
            <el-table-column label="橫幅圖片">
                <template #default="scope">
                    <el-image
                        class="h-24"
                        :src="scope.row.photoUrl"
                        fit="fill"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="上架時間" />
            <el-table-column prop="endTime" label="下架時間" />
            <el-table-column label="狀態">
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.status"
                        @change="editBannerStatus(scope.row.bannerId, $event)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="管理">
                <template #default="scope">
                    <div class="flex flex-col">
                        <el-link
                            class="justify-start"
                            @click="toEditPage(scope.row.bannerId)"
                            :underline="false"
                            type="primary"
                            icon="Edit"
                        >
                            編輯
                        </el-link>
                        <el-link
                            class="justify-start"
                            @click="deleteBanner(scope.row.bannerId)"
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
import * as toolTime from "@/tool/Time.js";
import * as apiBanner from "@/api/mgmt/banner/Banner.js";

const router = useRouter();
const page = ref(1);
const dataTotal = ref(0);
const tableData = ref([]);

const form = reactive({
    keyword: "",
});

onMounted(() => {
    // 取得橫幅分頁
    getBannerPage();

    // 監聽分頁頁碼變更
    watch(page, getBannerPage);
});

/**
 * 編輯橫幅狀態
 *
 * @param {int} bannerId 橫幅ID
 * @param {bool} status 橫幅狀態
 *
 * @returns {void}
 */
const editBannerStatus = async (bannerId, status) => {
    const response = await apiBanner.editBannerStatus(bannerId, status);

    if (response.status === false) {
        toolNotify("error", response.message);
        getBannerPage(); //失敗後重新刷新資料
        return;
    }

    toolNotify("success", response.message);
};

/**
 * 刪除橫幅
 *
 * @param {int} bannerId 橫幅ID
 *
 * @returns {void}
 */
const deleteBanner = async (bannerId) => {
    const param = {
        type: "confirm",
        message: "確定要刪除橫幅嗎?",
        agree: async () => {
            const response = await apiBanner.deleteBanner(bannerId);

            if (response.status === false) {
                toolNotify("error", response.message);
                return;
            }

            toolNotify("success", response.message);
            getBannerPage(); // 刪除成功後重新刷新列表
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
    router.push({ name: "mgmtBannerAdd" });
};

/**
 * 進入編輯頁面
 *
 * @param {int} bannerId 橫幅ID
 *
 * @return {void}
 */
const toEditPage = (bannerId) => {
    const param = {
        bannerId: bannerId,
    };

    router.push({
        name: "mgmtBannerEdit",
        params: param,
    });
};

/**
 * 取得橫幅分頁
 *
 * @returns {void}
 */
const getBannerPage = async () => {
    const response = await apiBanner.getBannerPage(page.value, form.keyword);

    if (response.status === false) {
        toolNotify("error", response.message);
        return;
    }

    const bannerPage = response.data.bannerPage;

    // 設定列表資料
    tableData.value = [];
    bannerPage.data.forEach((item) => {
        tableData.value.push({
            bannerId: item.bannerId,
            name: item.name,
            photoUrl: item.photoUrl,
            startTime: toolTime.getDateTime(item.startTime),
            endTime: toolTime.getDateTime(item.endTime),
            status: item.status,
        });
    });

    // 設定資料總數
    dataTotal.value = bannerPage.total;
};

/**
 * 搜尋橫幅
 *
 * @returns {void}
 */
const searchBanner = () => {
    page.value !== 1 ? (page.value = 1) : getBannerPage();
};
</script>
