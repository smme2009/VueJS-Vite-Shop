import type IResult from '@/interfaces/service/Result'
import Lodash from 'lodash'

/**
 * Service的通用結果物件建構工具
 */
export default class Result {
  private status: boolean = false // 狀態

  private message: string = '' // 訊息

  private data: Record<string, unknown> = {} // 資料

  /**
   * 設定狀態
   *
   * @param status 狀態
   *
   * @returns {this} 目前物件
   */
  public setStatus(status: boolean): this {
    this.status = status
    return this
  }

  /**
   * 設定訊息
   *
   * @param {string} message 訊息
   *
   * @returns {this} 目前物件
   */
  public setMessage(message: string): this {
    this.message = message
    return this
  }

  /**
   * 新增資料
   *
   * @param {string} name 名稱
   * @param {unknown} value 值
   *
   * @returns {this} 目前物件
   */
  public addData(name: string, value: unknown): this {
    this.data[name] = value
    return this
  }

  /**
   * 批量新增資料
   *
   * @param {object} data 資料
   *
   * @returns {this} 目前物件
   */
  public bulkAddData(data: object): this {
    Lodash.each(data, (value, key) => this.addData(key, value))
    return this
  }

  /**
   * 取得結果物件
   *
   * @returns {IResult} 結果物件
   */
  public build(): IResult {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
    }
  }
}
