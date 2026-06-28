import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 狀態管理-管理員
 */
export const useAdminStore = defineStore('admin', () => {
  const storeJwtToken = ref('') // JWT Token

  /**
   * 設定資訊
   *
   * @param JwtToken JWT Token
   *
   * @returns {void}
   */
  function setInfo(JwtToken: string): void {
    storeJwtToken.value = JwtToken
  }

  return {
    storeJwtToken,
    setInfo,
  }
})
