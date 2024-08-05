<template>
    <div>
        <!-- 搜尋列 -->
        <div class="flex justify-center mt-5">
            <div class="w-11/12 flex justify-between">
                <div class="flex">
                    <el-input
                        class="mr-1.5"
                        v-model="keyword"
                        placeholder="請輸入橫幅名稱"
                    />
                    <el-button
                        type="warning"
                        @click="searchBanner"
                        icon="Search"
                    >
                        搜尋
                    </el-button>
                </div>
                <div>
                    <el-button type="success" @click="toAddPage" icon="Plus">
                        新增橫幅
                    </el-button>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="flex justify-center mt-2.5">
            <div class="w-11/12">
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
                                @change="
                                    editBannerStatus(scope.row.bannerId, $event)
                                "
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="管理">
                        <template #default="scope">
                            <el-link
                                class="mr-2"
                                @click="toEditPage(scope.row.bannerId)"
                                type="primary"
                                icon="Edit"
                            >
                                編輯
                            </el-link>
                            <el-link
                                class="mr-2"
                                @click="deleteBanner(scope.row.bannerId)"
                                type="danger"
                                icon="Delete"
                            >
                                刪除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 分頁 -->
        <page />
    </div>
</template>

<script setup>
import page from "@/components/mgmt/public/page/Index.vue";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as toolNotify from "@/tool/Notify.js";
import * as toolMessage from "@/tool/Message.js";
import * as toolTime from "@/tool/Time.js";
import * as apiBanner from "@/api/mgmt/banner/Banner.js";

const router = useRouter();
const store = useStore();

const tableData = ref([]);
const keyword = defineModel("");

onMounted(() => {
    // 重設分頁資料
    store.commit("page/setNowPage", 1);

    // 初始化產品資料
    getBannerData();

    // 監聽當前頁碼
    watch(() => store.state.page.nowPage, getBannerData);
});

/**
 * 搜尋橫幅
 *
 * @returns {void}
 */
const searchBanner = () => {
    if (store.state.page.nowPage === 1) {
        // 直接取得資料
        getBannerData();
    } else {
        // 透過換頁取得資料
        store.commit("page/setNowPage", 1);
    }
};

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

    if (response.status) {
        toolNotify.success("通知", response.message);
    } else {
        toolNotify.error("通知", response.message, false);

        // 編輯失敗後重新刷新列表
        getBannerData();
    }
};

/**
 * 刪除橫幅
 *
 * @param {int} bannerId 橫幅ID
 *
 * @returns {void}
 */
const deleteBanner = async (bannerId) => {
    toolMessage.confirm("確定要刪除橫幅嗎?", async () => {
        const response = await apiBanner.deleteBanner(bannerId);

        if (response.status) {
            toolNotify.success("通知", response.message);

            // 刪除成功後重新刷新列表
            getBannerData();
        } else {
            toolNotify.error("通知", response.message);
        }
    });
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
 * 取得橫幅資料
 *
 * @returns {void}
 */
const getBannerData = async () => {
    const response = await apiBanner.getBannerPage(
        store.state.page.nowPage,
        keyword.value
    );

    if (response.status) {
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
        store.commit("page/setDataTotal", bannerPage.total);
    } else {
        toolNotify.error("通知", response.message);
    }
};
</script>
