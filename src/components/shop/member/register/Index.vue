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
            <div class="mb-4 text-center">
                <p>請輸入會員資料</p>
                <p class="text-red-500">*此為測試網站，資料請隨意填寫即可</p>
            </div>
            <el-form label-width="auto">
                <el-form-item
                    label="帳號(E-Mail)"
                    :error="formErrMsg.account"
                    required="true"
                >
                    <el-input
                        v-model="form.account"
                        placeholder="請輸入帳號(E-Mail)"
                    />
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
                <el-form-item
                    label="確認密碼"
                    :error="formErrMsg.checkPassword"
                    required="true"
                >
                    <el-input
                        v-model="form.checkPassword"
                        type="password"
                        placeholder="請輸入密碼"
                    />
                </el-form-item>
                <el-form-item
                    label="姓名"
                    :error="formErrMsg.name"
                    required="true"
                >
                    <el-input v-model="form.name" placeholder="請輸入姓名" />
                </el-form-item>
                <el-form-item
                    label="手機號碼"
                    :error="formErrMsg.phone"
                    required="true"
                >
                    <el-input
                        v-model="form.phone"
                        placeholder="請輸入手機號碼"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="space-y-2">
                    <div>
                        <el-button
                            type="primary"
                            class="w-full"
                            @click="register"
                        >
                            送出
                        </el-button>
                    </div>
                    <div>
                        <el-button class="w-full" @click="toLoginPage">
                            取消
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
import { register as apiRegister } from "@/api/shop/member/Register.js";
import toolNotify from "@/tool/Notify.js";

const router = useRouter();

const form = reactive({
    account: "",
    password: "",
    checkPassword: "",
    name: "",
    phone: "",
});

const formErrMsg = ref({});

const register = async () => {
    formErrMsg.value = {};

    const response = await apiRegister(form);

    if (response.status === false) {
        response.data.forEach((error) => {
            formErrMsg.value[error.name] = error.message.join("、");
        });

        return;
    }

    toolNotify("success", response.message);
    router.push({ name: "shopLogin" });
};

/**
 * 跳轉至登入頁
 *
 * @returns {void}
 */
const toLoginPage = () => {
    router.push({ name: "shopLogin" });
};
</script>
