/**
 * 介面-回應
 */
export default interface Response<T> {
  status: boolean
  message: string
  data: T
}
