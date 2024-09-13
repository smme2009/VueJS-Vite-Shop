<template>
    <el-card class="rounded-lg">
        <template #header>
            <div class="text-2xl font-bold">運送方式</div>
        </template>
        <div class="space-y-2">
            <div class="flex flex-wrap space-x-2 space-y-1">
                <el-radio :value="1" v-model="shipType" size="large">
                    宅配
                </el-radio>
                <el-select
                    v-if="shipType === 1"
                    v-model="addressId"
                    class="max-w-96"
                    filterable
                    placeholder="請輸入或選擇地址"
                    no-data-text="無資料"
                >
                    <el-option
                        v-for="memberAddress in memberAddressList"
                        :label="memberAddress.address"
                        :value="memberAddress.memberAddressId"
                    />
                </el-select>
                <el-button
                    v-if="shipType === 1"
                    type="primary"
                    @click="setDialogStatus(true)"
                    link
                >
                    新增地址
                </el-button>
            </div>
            <div>
                <el-radio :value="2" v-model="shipType" size="large" disabled>
                    超商取貨
                </el-radio>
            </div>
        </div>
    </el-card>
    <el-dialog
        v-model="showDialog"
        class="min-w-80 max-w-[600px]"
        title="新增地址"
    >
        <el-form-item label="地址" :error="newAddressErrMsg" required="true">
            <el-input v-model="newAddress" placeholder="請輸入地址" />
        </el-form-item>
        <template #footer>
            <el-button @click="setDialogStatus(false)">取消</el-button>
            <el-button type="primary" @click="addAddress"> 送出 </el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import toolNotify from "@/tool/Notify.js";
import * as apiMemberAddress from "@/api/shop/member/Address.js";

const shipType = defineModel("shipType");
const addressId = defineModel("addressId");
const memberAddressList = ref([]);
const showDialog = ref(false);
const newAddress = ref("");
const newAddressErrMsg = ref("");

onMounted(() => {
    getAddressList();
});

const getAddressList = async () => {
    const response = await apiMemberAddress.getMemberAddressList();

    memberAddressList.value = [];
    response.data.memberAddressList.forEach((memberAddress) => {
        memberAddressList.value.push({
            memberAddressId: memberAddress.memberAddressId,
            address: memberAddress.address,
        });
    });
};

const addAddress = async () => {
    const response = await apiMemberAddress.addMemberAddress(newAddress.value);

    if (response.status === false) {
        newAddressErrMsg.value = response.data[0].message.join("、");
        return;
    }

    toolNotify({
        type: "success",
        title: "通知",
        message: response.message,
    });

    showDialog.value = false;
    newAddress.value = "";

    getAddressList();
};

const setDialogStatus = (status) => {
    showDialog.value = status;
};
</script>
