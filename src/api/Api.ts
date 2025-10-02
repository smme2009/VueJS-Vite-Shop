import ToolAjax from './tool/Ajax'

/**
 * Api通用層，可以用來存放共用的工具和方法
 */
export default class Api {
  /**
   * 取得Ajax工具
   *
   * @returns {ToolAjax} Ajax工具實例
   */
  protected toolAjax(): ToolAjax {
    return new ToolAjax()
  }
}
