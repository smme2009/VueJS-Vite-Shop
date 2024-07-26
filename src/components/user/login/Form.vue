<template>
    <el-form>
        <el-card class="w-96 !rounded-lg">
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
import * as apiAccount from "@/api/user/Login.js";
import * as toolNotify from "@/tool/Notify.js";

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
const login = async () => {
    const response = await apiAccount.login(form.account, form.password);

    if (response.status) {
        // 儲存JWT Token
        const jwtToken = response.data.jwtToken;
        localStorage.setItem("jwtToken", jwtToken);

        router.push({ name: "mgmtHome" });
    } else {
        toolNotify.error("通知", response.message, false);
    }
};
</script>
