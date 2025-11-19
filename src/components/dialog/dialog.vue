<template>
  <el-dialog
    class="max-w-md"
    v-model="storeDialog.visible"
    title="訊息"
  >
    <span class="whitespace-pre-line">{{ storeDialog.message }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="close">確定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
defineOptions({ name: 'CompDialog' })

import { useDialogStore } from '@/stores/dialog'

const storeDialog = useDialogStore() //狀態管理-對話框

/**
 * 關閉對話框
 *
 * @returns {void}
 */
const close = (): void => {
  storeDialog.hide()
}
</script>
