import type IResponse from '@/interfaces/response/Response'
import type ILogin from '@/interfaces/response/account/Login'
import Api from '@/api/Api'

/**
 * API-登入
 */
export default class Login extends Api {
  /**
   * 登入
   *
   * @param {object} data Request資料
   *
   * @returns {Promise<null | IResponse<ILogin>>} 登入資料
   */
  public async login(
    data: object,
  ): Promise<null | IResponse<ILogin>> {
    return await this.toolAjax().post<ILogin>('/login', data)
  }
}
