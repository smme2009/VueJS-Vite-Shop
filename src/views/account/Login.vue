<template>
  <!-- 登入表單 -->
  <div class="h-full flex items-center justify-center">
    <el-card class="w-full max-w-md">
      <template #header>
        <div class="card-header">
          <span>登入</span>
        </div>
      </template>
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="帳號" prop="account">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="w-full flex justify-end">
          <el-button type="primary" @click="login">登入</el-button>
          <el-button>返回</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ViewAccountLogin' })

import type ILogin from '@/interfaces/request/account/Login'
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { useDialogStore } from '@/stores/dialog'
import RuleLogin from '@/validation/rules/account/Login'
import ToolValidate from '@/validation/tools/validate'
import SvcLogin from '@/services/account/Login'

const storeDialog = useDialogStore() // 狀態管理-對話框
const svcLogin = new SvcLogin() // 服務層-帳號-登入

// 表單Ref
const formRef = ref<FormInstance>()

// 表單資料
const form = reactive<ILogin>({
  account: '',
  password: '',
})

// 表單驗證規則
const rules = reactive(RuleLogin)

/**
 * 登入
 *
 * @returns {Promise<void>}
 */
const login = async (): Promise<void> => {
  // 表單驗證
  if ((await ToolValidate(formRef)) === false) {
    return
  }

  // 登入
  const result = await svcLogin.login(form.account, form.password, 1)

  // 登入失敗，顯示錯誤訊息
  if (result.status === false) {
    storeDialog.show(result.message)
    return
  }

  // 登入成功
  storeDialog.show(result.message)
}
</script>
