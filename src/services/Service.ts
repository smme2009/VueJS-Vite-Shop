import type IErrorField from '@/interfaces/response/error/Field'
import SvcToolResult from '@/services/tool/Result'
import Lodash from 'lodash'

/**
 * Service通用層，可以用來存放共用的工具和方法
 */
export default class Service {
  /**
   * Service的通用結果物件建構工具
   *
   * @returns {SvcToolResult} 通用結果物件建構工具
   */
  protected toolResult(): SvcToolResult {
    return new SvcToolResult()
  }

  /**
   * 格式化欄位錯誤訊息
   *
   * @param {IErrorField} errorMessages 欄位錯誤訊息
   *
   * @returns {string} 欄位錯誤訊息
   */
  protected formatFieldErrorMessage(
    errorMessages: IErrorField,
  ): string {
    return Lodash(errorMessages)
      .chain()
      .values()
      .flatten()
      .join('\n')
      .value()
  }
}
