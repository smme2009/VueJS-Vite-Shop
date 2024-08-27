<template>
    <div class="h-full w-full flex justify-center items-center">
        <el-card class="xs:w-auto md:w-96 !rounded-lg">
            <template #header>
                <div class="flex justify-center">
                    <router-link
                        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-sky-500"
                        :to="{ name: 'shopHome' }"
                    >
                        COORD
                    </router-link>
                </div>
            </template>
            <el-form label-width="auto">
                <el-form-item
                    label="帳號(E-Mail)"
                    :error="formErrMsg.account"
                    required="true"
                >
                    <el-input v-model="form.account" placeholder="請輸入帳號" />
                </el-form-item>
                <el-form-item
                    label="密碼"
                    :error="formErrMsg.password"
                    required="true"
                >
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="請輸入密碼"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="space-y-2">
                    <div>
                        <el-button type="primary" class="w-full" @click="login">
                            登入
                        </el-button>
                    </div>
                    <div>
                        <el-button class="w-full" @click="toRegisterPage">
                            註冊
                        </el-button>
                    </div>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import storeFeMember from "@/store/frontend/member/Index.js";
import { success as notifySuccess } from "@/tool/Notify.js";
import { error as notifyError } from "@/tool/Notify.js";
import { login as apiLogin } from "@/api/shop/member/Login.js";

const router = useRouter();
const store = storeFeMember();

const form = reactive({
    account: "",
    password: "",
});

const formErrMsg = ref({});

/**
 * 登入
 *
 * @returns {void}
 */
const login = async () => {
    formErrMsg.value = {};

    const response = await apiLogin(form.account, form.password);
    if (response.status === false) {
        notifyError("標題", response.message);

        response.data.forEach((error) => {
            formErrMsg.value[error.name] = error.message.join("、");
        });

        return;
    }

    store.setJwtToken(response.data.jwtToken);

    notifySuccess("通知", response.message);

    router.push({ name: "shopHome" });
};

/**
 * 跳轉至註冊頁
 *
 * @returns {void}
 */
const toRegisterPage = () => {
    router.push({ name: "shopRegister" });
};
</script>
