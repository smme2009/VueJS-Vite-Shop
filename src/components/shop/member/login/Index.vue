<template>
    <div class="h-full w-full flex justify-center items-center">
        <el-card class="xs:w-auto md:w-96 !rounded-lg">
            <template #header>
                <div class="flex justify-center">
                    <span
                        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-sky-500"
                    >
                        COORD
                    </span>
                </div>
            </template>
            <el-form>
                <el-form-item>
                    <el-input v-model="form.account" placeholder="請輸入帳號">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="請輸入密碼"
                    >
                        <template #prepend>
                            <el-icon>
                                <Key />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="space-y-2">
                    <div>
                        <el-button
                            type="primary"
                            class="w-full"
                            @click="login()"
                        >
                            登入
                        </el-button>
                    </div>
                    <div>
                        <el-button class="w-full">註冊</el-button>
                    </div>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import storeFeMember from "@/store/frontend/member/Index.js";

const router = useRouter();
const store = storeFeMember();

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
        router.push({ name: "shopHome" });
    }
};
</script>
