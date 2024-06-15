<template>
    <el-form>
        <el-card class="w-96">
            <template #header>
                <div class="card-header">
                    <span>登入</span>
                </div>
            </template>
            <el-form-item label="帳號">
                <el-input v-model="form.account" placeholder="請輸入帳號" />
            </el-form-item>
            <el-form-item label="密碼">
                <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="請輸入密碼"
                />
            </el-form-item>
            <template #footer>
                <div class="w-full flex justify-end">
                    <el-button type="primary" @click="login()">
                        登入
                    </el-button>
                </div>
            </template>
        </el-card>
    </el-form>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

import toolAjax from "@/tool/Ajax.js";

const router = useRouter();

const form = reactive({
    account: "",
    password: "",
});

/**
 * 登入
 *
 * @returns {void}
 */
const login = () => {
    toolAjax({
        method: "post",
        url: "/login",
        data: form,
        then: (response) => {
            const JwtToken = response.data.jwtToken;

            // 儲存JWT Tokwn
            localStorage.setItem("jwtToken", JwtToken);

            // 跳轉首頁
            router.push("/mgmt/home");
        },
    });
};
</script>
