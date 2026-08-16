import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 狀態管理-管理員
 */
export const useAdminStore = defineStore('admin', () => {
  const storeJwtToken = ref('') // JWT Token
  const storeName = ref('') // 名稱

  /**
   * 設定資訊
   *
   * @param JwtToken JWT Token
   *
   * @returns {void}
   */
  function setJwtToken(JwtToken: string): void {
    storeJwtToken.value = JwtToken
  }

  /**
   * 設定名稱
   *
   * @param name 名稱
   *
   * @returns {void}
   */
  function setName(name: string): void {
    storeName.value = name
  }

  return {
    storeJwtToken,
    storeName,
    setJwtToken,
    setName,
  }
})
