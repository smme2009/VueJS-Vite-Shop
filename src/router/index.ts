import { createRouter, createWebHistory } from 'vue-router'
import routeMgmtAccount from './mgmt/account'

// 定義路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routeMgmtAccount],
})

// 通過路由後所執行的動作
router.afterEach((to) => {
  const title = to.meta.title ?? ''
  document.title = title === '' ? 'COORD' : `${title} | COORD`
})

export default router
