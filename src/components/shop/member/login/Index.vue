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
            <el-form @keypress.enter="login()" label-width="auto">
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
import { useRoute, useRouter } from "vue-router";
import storeFeMember from "@/store/frontend/member/Index.js";
import storeFeCart from "@/store/frontend/cart/Index.js";
import toolNotify from "@/tool/Notify.js";
import { login as apiLogin } from "@/api/shop/member/Login.js";

const route = useRoute();
const router = useRouter();
const storeMember = storeFeMember();
const storeCart = storeFeCart();
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

    storeMember.setJwtToken(response.data.jwtToken); // 設定JWT Token
    storeCart.editMemberCartProductFormLocal(); // 將本地購物車與會員購物車合併
    toolNotify("success", response.message);

    const pushPageName = route.query.pushPageName;
    const name = pushPageName === undefined ? "shopHome" : pushPageName;
    router.push({ name: name });
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
