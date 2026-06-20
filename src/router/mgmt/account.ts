import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/mgmt',
    name: 'mgmtHome',
    component: () => import('@/views/mgmt/home/index.vue'),
    meta: {
      title: '首頁',
    },
  },
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
