import type ILogin from '@/interfaces/request/account/Login'
import type { FormRules } from 'element-plus'

// 表單驗證-帳號-登入
export default {
  account: [
    {
      required: true,
      message: '請填寫此欄位',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '請填寫此欄位',
      trigger: 'blur',
    },
  ],
} as FormRules<ILogin>
