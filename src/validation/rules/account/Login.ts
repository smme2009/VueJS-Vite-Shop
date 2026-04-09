import type ILogin from '@/interfaces/request/account/Login'
import * as yup from 'yup'

// 表單驗證-帳號-登入
export default yup.object<ILogin>({
  // 帳號
  account: yup.string().required('請填寫此欄位'),

  // 密碼
  password: yup.string().required('請填寫此欄位'),
})
