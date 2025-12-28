import type IField from '@/interfaces/response/error/Field'

/**
 * 介面-回應
 */
export default interface Response<T> {
  status: boolean
  message: string
  data: T
  errors: IField
}
