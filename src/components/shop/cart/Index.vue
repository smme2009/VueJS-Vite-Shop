<template>
    <div class="space-y-2">
        <el-card class="w-full flex-auto rounded-lg">
            <div class="space-y-1 mb-1">
                <div
                    v-for="product in storeCart.memberData"
                    class="h-32 border rounded-lg flex justify-center"
                >
                    <div class="w-10 flex justify-center items-center">
                        <el-checkbox
                            v-model="cartIdList"
                            :value="product.cartId"
                            size="large"
                            @change="setTotal"
                        />
                    </div>
                    <div class="h-full w-32 p-1">
                        <img
                            class="h-full w-full rounded-lg"
                            :src="product.productPhotoUrl"
                        />
                    </div>
                    <div class="flex-auto p-1 space-y-1">
                        <div class="flex justify-between">
                            <div class="text-1xl font-medium">
                                {{ product.productName }}
                            </div>
                            <el-button
                                type="danger"
                                @click="deleteCartProduct(product.cartId)"
                                circle
                            >
                                <el-icon><Close /></el-icon>
                            </el-button>
                        </div>
                        <div class="text-1xl font-medium text-red-600">
                            {{ "$" + formatNumber(product.productPrice) }}
                        </div>
                        <div>
                            <el-button type="primary" @click="getCoupon" link>
                                查看優惠券
                            </el-button>
                        </div>
                        <div>
                            <el-input-number
                                v-model="product.quantity"
                                @change="
                                    (value) =>
                                        editCartProductQuantity(
                                            product.productId,
                                            value
                                        )
                                "
                                min="1"
                                :max="product.productQuantity"
                                size="small"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card class="w-full rounded-lg">
            <template #header>
                <div class="text-center text-2xl">結帳明細</div>
            </template>
            <div class="space-y-1">
                <div class="flex justify-between">
                    <div class="text-center text-xl">商品總額</div>
                    <div class="text-center text-xl text-red-600">
                        ${{ total }}
                    </div>
                </div>
                <div class="flex justify-between">
                    <div class="text-center text-xl">運費</div>
                    <div class="text-center text-xl text-red-600">$80</div>
                </div>
            </div>
            <template #footer>
                <div class="space-y-1">
                    <div class="flex justify-between">
                        <div class="text-center text-xl">預計結帳金額</div>
                        <div class="text-center text-xl text-red-600">
                            ${{ total + 80 }}
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <el-button type="primary" icon="Goods">
                            結帳({{ count }})
                        </el-button>
                    </div>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import storeFeMember from "@/store/frontend/member/Index.js";
import storeFeCart from "@/store/frontend/cart/Index.js";
import toolNotify from "@/tool/Notify.js";
import { confirm } from "@/tool/Message.js";
import { formatNumber } from "@/tool/Str.js";

const router = useRouter();
const storeMember = storeFeMember();
const storeCart = storeFeCart();
const cartIdList = ref([]);
const total = ref(0);
const count = ref(0);

onMounted(() => {
    if (storeMember.hasToken === false) {
        const query = {
            pushPageName: "shopCart",
        };

        router.push({
            name: "shopLogin",
            query: query,
        });

        return;
    }
});

/**
 * 取得優惠券
 *
 * @returns {void}
 */
const getCoupon = () => {
    toolNotify({
        type: "success",
        title: "通知",
        message: "查無可用優惠券",
    });
};

/**
 * 編輯購物車商品數量
 *
 * @param {int} productId 商品車ID
 * @param {int} quantity 數量
 *
 * @returns {void}
 */
const editCartProductQuantity = async (productId, quantity) => {
    const param = {
        productId: productId,
        quantity: quantity,
    };

    const isEdit = await storeCart.editMemberCartProduct(param);

    if (isEdit) {
        setTotal();
    }
};

/**
 * 刪除購物車商品
 *
 * @param {int} cartId 購物車ID
 *
 * @returns {void}
 */
const deleteCartProduct = (cartId) => {
    confirm("確定要刪除商品嗎?", async () => {
        const isDelete = await storeCart.deleteMemberCartProduct(cartId);

        if (isDelete) {
            setTotal();
        }
    });
};

/**
 * 計算總計
 *
 * @returns {void}
 */
const setTotal = () => {
    total.value = 0;
    count.value = 0;

    // 設定總計
    storeCart.memberData.forEach((product) => {
        if (cartIdList.value.includes(product.cartId)) {
            total.value += product.productPrice * product.quantity;
            count.value++;
        }
    });
};
</script>
