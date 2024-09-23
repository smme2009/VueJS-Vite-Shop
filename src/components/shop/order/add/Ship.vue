<template>
    <el-card class="rounded-lg">
        <template #header>
            <div class="text-2xl font-bold">運送方式</div>
        </template>
        <div class="space-y-2">
            <div class="flex flex-wrap space-x-2 space-y-1">
                <el-radio
                    :value="1"
                    v-model="orderShipId"
                    size="large"
                    @change="checkOrderShip"
                >
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
                            v-for="(address, id) in memberAddressList"
                            :label="address"
                            :value="id"
                        />
                    </el-select>
                </el-form-item>
                <el-button
                    v-if="orderShipId === 1"
                    type="primary"
                    @click="showDialog = true"
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
                    @change="checkOrderShip"
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
            <el-button @click="showDialog = false">取消</el-button>
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
import * as apiOrderShip from "@/api/shop/order/OrderShip.js";

const orderShipId = defineModel("orderShipId");
const orderShipPrice = defineModel("orderShipPrice");
const address = defineModel("address");
const addressErrMsg = defineModel("addressErrMsg");
const addressId = ref();
const memberAddressList = ref([]);
const shipPriceList = ref([]);
const showDialog = ref(false);
const newAddress = ref("");
const newAddressErrMsg = ref("");

onMounted(() => {
    // 取得會員地址列表
    getMemberAddressList();

    // 取得運費列表
    getShipPriceList();
});

/**
 * 取得運費列表
 *
 * @returns {void}
 */
const getShipPriceList = async () => {
    const response = await apiOrderShip.getOrderShipList();

    response.data.orderShipList.forEach((orderShip) => {
        const id = orderShip.orderShipId;
        const price = orderShip.price;

        shipPriceList.value[id] = price;
    });
};

/**
 * 取得會員地址列表
 *
 * @returns {void}
 */
const getMemberAddressList = async () => {
    const response = await apiMemberAddress.getMemberAddressList();

    memberAddressList.value = [];
    response.data.memberAddressList.forEach((memberAddress) => {
        const id = memberAddress.memberAddressId;
        const address = memberAddress.address;

        memberAddressList.value[id] = address;
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
 * 選取運送方式
 *
 * @returns {void}
 */
const checkOrderShip = (orderShipId) => {
    orderShipPrice.value = shipPriceList.value[orderShipId];
};

/**
 * 選取地址
 *
 * @returns {void}
 */
const checkAddress = () => {
    address.value = memberAddressList.value[addressId.value];
};
</script>
