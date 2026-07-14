import type IResponse from '@/interfaces/response/Response'
import Api from '@/api/Api'

/**
 * API-登出
 */
export default class Logout extends Api {
  /**
   * 登出
   *
   * @returns {Promise<null | IResponse<[]>>} 登出資料
   */
  public async logout(): Promise<null | IResponse<[]>> {
    return await this.toolAjax().post('/mgmt/logout')
  }
}
