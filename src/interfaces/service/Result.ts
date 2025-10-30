/**
 * 介面-服務層-結果
 */
export default interface Result {
  status: boolean
  message: string
  data: Record<string, unknown>
}
