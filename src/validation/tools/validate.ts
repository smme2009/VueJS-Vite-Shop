import type { Ref } from 'vue'
import type { FormInstance } from 'element-plus'

/**
 * 工具-表單驗證
 *
 * @param {Ref<undefined | FormInstance>} refForm 表單(Ref)
 *
 * @returns {Promise<boolean>} 驗證結果
 */
export default async (
  refForm: Ref<undefined | FormInstance>,
): Promise<boolean> => {
  // 表單未定義，回傳錯誤
  if (refForm.value === undefined) {
    return false
  }

  // 驗證表單
  return await refForm.value.validate()
}
