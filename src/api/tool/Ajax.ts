import type IResponse from '@/interfaces/response/Response'
import Axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import Lodash from 'lodash'

/**
 * Ajax工具
 */
export default class Ajax {
  // Axios實例
  private instance: AxiosInstance

  /**
   * 建構子
   */
  constructor(jwtToken?: string) {
    // 取得Axios實例
    this.instance = this.getInstance()

    // 設定JWT Token
    if (jwtToken !== undefined) {
      this.setJwtToken(jwtToken)
    }
  }

  /**
   * GET請求
   *
   * @param {string} url 網址
   * @param {object} [data] 請求資料
   *
   * @returns {Promise<null | IResponse<T>>} 回傳資料
   */
  public async get<T>(
    url: string,
    data?: object,
  ): Promise<null | IResponse<T>> {
    const response = await this.instance.get(url, { params: data })
    return this.getResponseData<T>(response)
  }

  /**
   * POST請求
   *
   * @param {string} url 網址
   * @param {object} [data] 請求資料
   *
   * @returns {Promise<null | IResponse<T>>} 回傳資料
   */
  public async post<T>(
    url: string,
    data?: object,
  ): Promise<null | IResponse<T>> {
    const response = await this.instance.post(url, data)
    return this.getResponseData<T>(response)
  }

  /**
   * 表單POST請求
   *
   * @param {string} url 網址
   * @param {object} data 請求資料
   *
   * @returns {Promise<null | IResponse<T>>} 回傳資料
   */
  public async postForm<T>(
    url: string,
    data: object,
  ): Promise<null | IResponse<T>> {
    // 組成表單資料
    const formData = new FormData()
    Lodash.each(data, (value, key) => {
      formData.append(key, value)
    })

    // Header
    const headers = { 'Content-Type': 'multipart/form-data' }
    const response = await this.instance.post(url, formData, {
      headers: headers,
    })

    return this.getResponseData<T>(response)
  }

  /**
   * PUT請求
   *
   * @param {string} url 網址
   * @param {object} [data] 請求資料
   *
   * @returns {Promise<null | IResponse<T>>} 回傳資料
   */
  public async put<T>(
    url: string,
    data?: object,
  ): Promise<null | IResponse<T>> {
    const response = await this.instance.put(url, data)
    return this.getResponseData<T>(response)
  }

  /**
   * PATCH請求
   *
   * @param {string} url 網址
   * @param {object} [data] 請求資料
   *
   * @returns {Promise<null | IResponse<T>>} 回傳資料
   */
  public async patch<T>(
    url: string,
    data?: object,
  ): Promise<null | IResponse<T>> {
    const response = await this.instance.patch(url, data)
    return this.getResponseData<T>(response)
  }

  /**
   * DELETE請求
   *
   * @param {string} url 網址
   *
   * @returns {Promise<null | IResponse<T>>} 回傳資料
   */
  public async delete<T>(url: string): Promise<null | IResponse<T>> {
    const response = await this.instance.delete(url)
    return this.getResponseData<T>(response)
  }

  /**
   * 取得Axios實例
   *
   * @returns {AxiosInstance} Axios實例
   */
  private getInstance(): AxiosInstance {
    return Axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
      timeout: 20000,
      // 設定可不觸發Catch的Http Code
      validateStatus: (status) => {
        // 這系列的Http Code可不觸發Catch
        return Lodash.some(
          [200, 400, 500],
          (code) => status >= code && status <= code + 99,
        )
      },
    })
  }

  /**
   * 設定JWT Token
   *
   * @param {string} jwtToken JWT Token
   */
  private setJwtToken(jwtToken: string): void {
    const authZ = `Bearer ${jwtToken}`
    this.instance.defaults.headers.common['Authorization'] = authZ
  }

  /**
   * 處理回傳資料
   *
   * @param {AxiosResponse} response 回應
   *
   * @returns {null | IResponse<T>} 回傳資料
   */
  private getResponseData<T>(
    response: AxiosResponse,
  ): null | IResponse<T> {
    switch (response.status) {
      // 請求有回應，回傳資料
      case 200:
        return {
          ...response.data,
          status: true,
        }
      case 400:
      case 404:
      case 422:
        return {
          ...response.data,
          status: false,
        }
      // 其餘狀態先當作例外
      default:
        return null
    }
  }
}
