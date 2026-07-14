import type IResult from '@/interfaces/service/Result'
import Service from '@/services/Service'
import ApiLogout from '@/api/admin/Logout'

/**
 * 服務層-登出
 */
export default class LogoutService extends Service {
  /**
   * 建構子
   */
  constructor(
    private readonly apiLogout: ApiLogout = new ApiLogout(),
  ) {
    super()
  }

  /**
   * 登出
   *
   * @returns {IResult} 結果物件
   */
  public async logout(): Promise<IResult> {
    // 登出
    const response = await this.apiLogout.logout()

    // 登出失敗，系統異常
    if (response === null) {
      return this.toolResult()
        .setStatus(false)
        .setMessage('登出失敗，系統異常')
        .build()
    }

    // 登出失敗，資料異常
    if (response.status === false) {
      const message = this.formatFieldErrorMessage(response.errors)

      return this.toolResult()
        .setStatus(false)
        .setMessage(message)
        .build()
    }

    // 登出成功，回傳結果
    return this.toolResult()
      .setStatus(response.status)
      .setMessage(response.message)
      .build()
  }
}
