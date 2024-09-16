<template>
    <el-card class="rounded-lg">
        <template #header>
            <div class="text-2xl font-bold">運送方式</div>
        </template>
        <div class="space-y-2">
            <div class="flex flex-wrap space-x-2 space-y-1">
                <el-radio :value="1" v-model="orderShipId" size="large">
                    宅配
                </el-radio>
                <el-form-item class="w-full max-w-96" :error="addressErrMsg">
                    <el-select
                        v-if="orderShipId === 1"
                        v-model="addressId"
                        filterable
                        placeholder="請選擇地址"
                        no-data-text="無資料"
                        @change="checkAddress"
                    >
                        <el-option
                            v-for="(address, addressId) in memberAddressList"
                            :label="address"
                            :value="addressId"
                        />
                    </el-select>
                </el-form-item>
                <el-button
                    v-if="orderShipId === 1"
                    type="primary"
                    @click="setDialogStatus(true)"
                    link
                >
                    新增地址
                </el-button>
            </div>
            <div>
                <el-radio
                    :value="2"
                    v-model="orderShipId"
                    size="large"
                    disabled
                >
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
            <el-button type="primary" @click="addMemberAddress">
                送出
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import toolNotify from "@/tool/Notify.js";
import * as apiMemberAddress from "@/api/shop/member/Address.js";

const orderShipId = defineModel("orderShipId");
const address = defineModel("address");
const addressErrMsg = defineModel("addressErrMsg");
const addressId = ref();
const memberAddressList = ref([]);
const showDialog = ref(false);
const newAddress = ref("");
const newAddressErrMsg = ref("");

onMounted(() => {
    getMemberAddressList();
});

/**
 * 取得會員地址列表
 *
 * @returns {void}
 */
const getMemberAddressList = async () => {
    const response = await apiMemberAddress.getMemberAddressList();

    memberAddressList.value = [];
    response.data.memberAddressList.forEach((memberAddress) => {
        const addressId = memberAddress.memberAddressId;
        const address = memberAddress.address;

        memberAddressList.value[addressId] = address;
    });
};

/**
 * 新增會員地址
 *
 * @returns {void}
 */
const addMemberAddress = async () => {
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

    getMemberAddressList();
};

/**
 * 設定Dialog狀態
 *
 * @param {bool} status 狀態
 *
 * @returns {void}
 */
const setDialogStatus = (status) => {
    showDialog.value = status;
};

/**
 * 選取地址
 *
 * @param {int} addressId 地址ID
 *
 * @returns {void}
 */
const checkAddress = (addressId) => {
    address.value = memberAddressList.value[addressId];
};
</script>
