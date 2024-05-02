<template>
    <el-form>
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>登入</span>
                </div>
            </template>
            <el-form-item label="帳號">
                <el-input v-model="form.account" placeholder="請輸入帳號" />
            </el-form-item>
            <el-form-item label="密碼">
                <el-input v-model="form.password" type="password" placeholder="請輸入密碼" />
            </el-form-item>
            <template #footer>
                <el-row>
                    <el-col :span="6" :offset="18">
                        <el-form-item>
                            <el-button type="primary" @click="submit">登入</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </template>
        </el-card>
    </el-form>
</template>

<style lang="scss" scoped>
.el-card {
    width: 400px;
}

.el-input {
    width: 100%;
}
</style>

<script setup>
import { reactive } from 'vue';
import ajax from '@/tool/Ajax.js';

const form = reactive({
    account: '',
    password: '',
});

const submit = () => {
    ajax({
        method: 'post',
        url: '/login',
        data: form,
        then: (response) => {
            localStorage.jwtToken = response.data.jwtToken;
        },
    });
};
</script>