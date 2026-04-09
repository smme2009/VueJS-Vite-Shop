<template>
  <div
    class="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6"
  >
    <div class="w-full max-w-[420px] relative z-10">
      <!-- Logo -->
      <div class="mb-12 text-center">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-6 shadow-lg shadow-primary/10"
        >
          <span
            class="material-symbols-outlined text-on-primary text-3xl"
          >
            admin_panel_settings
          </span>
        </div>
        <h1
          class="editorial-headline text-3xl font-extrabold text-primary tracking-tight mb-2"
        >
          COORD
        </h1>
      </div>
      <!-- 表單 -->
      <div
        class="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_20px_50px_rgba(25,28,29,0.05)] border-t-4 border-primary"
      >
        <form @submit.prevent="login" class="space-y-6">
          <!-- 帳號欄位 -->
          <div class="space-y-2">
            <label
              class="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2"
              for="account"
            >
              <span class="material-symbols-outlined text-base">
                person
              </span>
              帳號
            </label>
            <div class="relative group">
              <input
                v-model="account"
                id="account"
                name="account"
                class="w-full bg-surface-container-low border-b-2 border-transparent outline-none focus:bg-surface-container-lowest focus:border-primary px-0 py-3 transition-all duration-300 placeholder:text-outline-variant text-on-surface"
                :class="{ 'border-error': errors.account }"
                type="text"
                placeholder="請輸入帳號"
              />
              <span
                v-if="errors.account"
                class="text-error text-xs mt-1 block"
              >
                {{ errors.account }}
              </span>
            </div>
          </div>
          <!-- 密碼欄位 -->
          <div class="space-y-2">
            <label
              class="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2"
              for="password"
            >
              <span class="material-symbols-outlined text-base">
                lock
              </span>
              密碼
            </label>
            <div class="relative group">
              <input
                v-model="password"
                id="password"
                name="password"
                class="w-full bg-surface-container-low border-b-2 border-transparent outline-none focus:bg-surface-container-lowest focus:border-primary px-0 py-3 transition-all duration-300 placeholder:text-outline-variant text-on-surface"
                :class="{ 'border-error': errors.password }"
                type="password"
                placeholder="請輸入密碼"
              />
              <span
                v-if="errors.password"
                class="text-error text-xs mt-1 block"
              >
                {{ errors.password }}
              </span>
            </div>
          </div>
          <!-- 登入按鈕 -->
          <button
            type="submit"
            class="w-full bg-primary text-on-primary py-4 px-6 rounded-md font-bold text-sm tracking-wide shadow-md hover:bg-primary-container transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            登入
            <span
              class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform"
            >
              arrow_forward
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MgmtLogin',
})

import { useForm } from 'vee-validate'
import { useDialogStore } from '@/stores/dialog'
import ruleLogin from '@/validation/rules/account/Login'
import SvcLogin from '@/services/account/Login'

const storeDialog = useDialogStore() // 狀態管理-對話框
const svcLogin = new SvcLogin() // 服務層-帳號-登入

// VeeValidate
const { errors, defineField, validate, values } = useForm({
  validationSchema: ruleLogin,
})

// 定義表單欄位
const [account] = defineField('account')
const [password] = defineField('password')

/**
 * 登入
 *
 * @returns {Promise<void>}
 */
const login = async (): Promise<void> => {
  // 手動驗證表單
  const { valid } = await validate()

  // 驗證失敗，中斷執行
  if (valid === false) {
    return
  }

  // 登入
  const result = await svcLogin.login(
    values.account,
    values.password,
    1,
  )

  // 登入失敗，顯示錯誤訊息
  if (result.status === false) {
    storeDialog.show(result.message)
    return
  }

  // 登入成功
  storeDialog.show(result.message)
}
</script>
