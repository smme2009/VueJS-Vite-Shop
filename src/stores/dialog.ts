import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 狀態管理-對話框
 */
export const useDialogStore = defineStore('dialog', () => {
  const storeVisible = ref(false) // 顯示狀態
  const storeMessage = ref('') // 訊息
  const storeType = ref('info') // 類型

  /**
   * 顯示對話框
   *
   * @param {string} message 訊息文字
   * @param {string} type 對話框類型
   *
   * @returns {void}
   */
  function show(message: string, type: string = 'info'): void {
    storeVisible.value = true
    storeMessage.value = message
    storeType.value = type
  }

  /**
   * 隱藏對話框
   *
   * @returns {void}
   */
  function hide(): void {
    storeVisible.value = false
    storeMessage.value = ''
    storeType.value = 'info'
  }

  return {
    storeVisible,
    storeMessage,
    storeType,
    show,
    hide,
  }
})
