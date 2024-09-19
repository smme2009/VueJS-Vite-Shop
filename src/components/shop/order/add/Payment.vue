<template>
    <el-card class="rounded-lg">
        <template #header>
            <div class="text-2xl font-bold">付款方式</div>
        </template>
        <div class="flex flex-col space-y-2">
            <el-radio :value="1" v-model="orderPaymentId" size="large">
                貨到付款
            </el-radio>
            <el-radio :value="2" v-model="orderPaymentId" size="large" disabled>
                信用卡
            </el-radio>
            <el-radio :value="3" v-model="orderPaymentId" size="large" disabled>
                行動支付
            </el-radio>
        </div>
    </el-card>
</template>

<script setup>
const orderPaymentId = defineModel();
</script>
