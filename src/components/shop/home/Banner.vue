<template>
    <div class="p-1">
        <!-- 如果使用單一元件做類型切換，會有圖片大小異常的問題，所以先分為兩個元件 -->
        <!-- 元件的自動高度在手機版型會有異常，所以先把高度寫死 -->
        <el-carousel type="card" class="xs:max-md:hidden md:h-72 xl:h-80">
            <el-carousel-item
                v-for="banner in bannerData"
                class="md:!h-72 xl:!h-80 rounded-lg"
                @click="toUrl(banner.url)"
            >
                <el-image class="h-full w-full" :src="banner.photoUrl" />
            </el-carousel-item>
        </el-carousel>
        <el-carousel class="xs:h-60 sm:h-64 md:hidden">
            <el-carousel-item
                v-for="banner in bannerData"
                class="xs:!h-60 sm:!h-64 rounded-lg"
                @click="toUrl(banner.url)"
            >
                <el-image class="h-full w-full" :src="banner.photoUrl" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as toolNotify from "@/tool/Notify.js";
import * as apiBanner from "@/api/shop/banner/Banner.js";

const bannerData = ref([]);

onMounted(() => {
    // 取得橫幅資料
    getBannerList();
});

/**
 * 取得橫幅列表
 *
 * @requires {void}
 */
const getBannerList = async () => {
    const response = await apiBanner.getBannerList();

    if (response.status) {
        const bannerList = response.data.bannerList;

        // 設定橫幅資料
        bannerData.value = [];
        bannerList.forEach((item) => {
            bannerData.value.push({
                bannerId: item.bannerId,
                photoUrl: item.photoUrl,
                name: item.name,
                url: item.url,
            });
        });
    } else {
        toolNotify.error("通知", response.message);
    }
};

/**
 * 跳轉到橫幅設定的網址
 *
 * @param {string} url 網址
 *
 * @requires {void}
 */
const toUrl = (url) => {
    if (url !== null) {
        // 可能為外部頁面，統一不使用Vue Router進行跳轉
        window.location.href = url;
    }
};
</script>
