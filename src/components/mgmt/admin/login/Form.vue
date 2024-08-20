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
import storeBeAdmin from "@/store/backend/admin/Index.js";

const router = useRouter();
const store = storeBeAdmin();

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
    const isLogin = await store.setJwtToken(form.account, form.password);

    if (isLogin === true) {
        router.push({ name: "mgmtHome" });
    }
};
</script>
