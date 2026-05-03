import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/mgmt/login',
    name: 'mgmtLogin',
    component: () => import('@/views/mgmt/login/index.vue'),
    meta: {
      title: '登入',
    },
  },
]

export default routes
