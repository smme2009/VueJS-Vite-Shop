import type IResult from '@/interfaces/service/Result'
import { useAdminStore } from '@/stores/admin'
import Service from '@/services/Service'
import ApiLogin from '@/api/admin/Login'

/**
 * 服務層-登入
 */
export default class LoginService extends Service {
  /**
   * 建構子
   */
  constructor(private readonly apiLogin: ApiLogin = new ApiLogin()) {
    super()
  }

  /**
   * 登入
   *
   * @param {string} account 帳號
   * @param {string} password 密碼
   * @param {number} roleId 角色ID
   *
   * @returns {IResult} 結果物件
   */
  public async login(
    account: string,
    password: string,
    roleId: number,
  ): Promise<IResult> {
    // API資料
    const data = {
      account: account,
      password: password,
      roleId: roleId,
    }

    // 登入
    const response = await this.apiLogin.login(data)

    // 登入失敗，系統異常
    if (response === null) {
      return this.toolResult()
        .setStatus(false)
        .setMessage('登入失敗，系統異常')
        .build()
    }

    // 登入失敗，資料異常
    if (response.status === false) {
      const message = this.formatFieldErrorMessage(response.errors)

      return this.toolResult()
        .setStatus(false)
        .setMessage(message)
        .build()
    }

    // 設定管理員資訊
    const storeAdmin = useAdminStore()
    storeAdmin.setJwtToken(response.data.jwtToken)
    storeAdmin.setName(response.data.name)

    // 登入成功，回傳結果
    return this.toolResult()
      .setStatus(response.status)
      .setMessage(response.message)
      .bulkAddData(response.data)
      .build()
  }
}
