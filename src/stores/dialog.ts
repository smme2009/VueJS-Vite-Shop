import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 狀態管理-對話框
 */
export const useDialogStore = defineStore('dialog', () => {
  const visible = ref(false) // 顯示狀態
  const message = ref('') // 訊息

  /**
   * 顯示對話框
   *
   * @param {string} text 訊息文字
   *
   * @returns {void}
   */
  function show(text: string): void {
    visible.value = true
    message.value = text
  }

  /**
   * 隱藏對話框
   *
   * @returns {void}
   */
  function hide(): void {
    visible.value = false
    message.value = ''
  }

  return {
    visible,
    message,
    show,
    hide,
  }
})
