<template>
    <div class="h-full w-full flex justify-center items-center">
        <el-card class="w-[90%] max-w-96 !rounded-lg">
            <template #header>
                <div class="card-header">
                    <div class="flex justify-center">
                        <router-link
                            class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-sky-500"
                            :to="{ name: 'mgmtLogin' }"
                        >
                            COORD
                        </router-link>
                    </div>
                </div>
            </template>
            <el-form @keypress.enter="login">
                <el-form-item label="帳號" :error="formErrMsg.account">
                    <el-input v-model="form.account" placeholder="請輸入帳號" />
                </el-form-item>
                <el-form-item label="密碼" :error="formErrMsg.password">
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="請輸入密碼"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="w-full flex justify-end">
                    <el-button type="primary" @click="login">登入</el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import storeBeAdmin from "@/store/backend/admin/Index.js";
import { login as apiLogin } from "@/api/mgmt/admin/Login.js";
import toolNotify from "@/tool/Notify.js";

const router = useRouter();
const storeAdmin = storeBeAdmin();
const formErrMsg = ref({});

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
    const response = await apiLogin(form.account, form.password);

    formErrMsg.value = {};
    if (response.status === false) {
        const errorList = response.data.errorList ?? [];

        errorList.forEach((error) => {
            formErrMsg.value[error.name] = error.message.join("、");
        });

        toolNotify("error", response.message);
        return;
    }

    storeAdmin.jwtToken = response.data.jwtToken;
    router.push({ name: "mgmtHome" });
};
</script>
