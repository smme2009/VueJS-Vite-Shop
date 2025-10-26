<template>
  <el-dialog class="max-w-md" v-model="visible" title="訊息">
    <span>{{ message }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="close">確定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
defineOptions({ name: 'CompDialog' })

const visible = defineModel('visible', { default: false }) // 顯示狀態
const message = defineModel('message', { default: '' }) // 訊息

/**
 * 關閉對話框
 *
 * @returns {void}
 */
const close = (): void => {
  visible.value = false
}
</script>
