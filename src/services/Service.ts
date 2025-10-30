import SvcToolResult from '@/services/tool/Result'

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
}
