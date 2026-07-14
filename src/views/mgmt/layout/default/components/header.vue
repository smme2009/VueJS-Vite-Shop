<template>
  <div
    class="fixed top-0 right-0 left-64 z-30 bg-surface/80 backdrop-blur-xl h-16 flex items-center justify-between px-8 border-b border-outline-variant/10"
  >
    <div class="flex items-center gap-4">
      <h1
        class="text-lg font-bold font-manrope tracking-tight text-on-surface"
      >
        {{ title }}
      </h1>
    </div>
    <div class="flex items-center gap-6">
      <div class="relative hidden md:flex items-center">
        <span
          class="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]"
          data-icon="search"
        >
          search
        </span>
        <input
          class="pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded-md text-sm w-64 focus:ring-1 focus:ring-primary/30"
          placeholder="搜尋數據..."
          type="text"
        />
      </div>
      <div class="flex items-center gap-4 text-on-surface-variant">
        <button
          class="w-8 h-8 inline-flex items-center justify-center hover:opacity-70 transition-opacity relative"
        >
          <span
            class="material-symbols-outlined text-[24px] leading-none"
            data-icon="notifications"
          >
            notifications
          </span>
          <span
            class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-surface"
          ></span>
        </button>
        <Menu as="div" class="relative">
          <MenuButton
            class="w-8 h-8 inline-flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <span
              class="material-symbols-outlined text-[24px] leading-none"
              data-icon="person"
            >
              person
            </span>
          </MenuButton>
          <Transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <MenuItems
              class="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-xl shadow-[0_20px_50px_rgba(25,28,29,0.1)] border border-outline-variant/10 overflow-hidden z-50 focus:outline-none"
            >
              <div
                class="p-4 flex items-center gap-3 bg-surface-container-low/30"
              >
                <div
                  class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-bold overflow-hidden"
                >
                  管
                </div>
                <div class="flex flex-col min-w-0">
                  <span
                    class="text-sm font-bold font-manrope truncate text-on-surface"
                  >
                    管理員用戶
                  </span>
                  <span
                    class="text-[10px] text-on-surface-variant uppercase tracking-wider"
                  >
                    管理套件
                  </span>
                </div>
              </div>
              <div class="h-px bg-outline-variant/10"></div>
              <div class="p-2">
                <MenuItem v-slot="{ active }">
                  <a
                    :class="[
                      active
                        ? 'bg-surface-container-high text-primary'
                        : 'text-on-surface-variant',
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                    ]"
                    href="#"
                  >
                    <span
                      class="material-symbols-outlined text-[20px]"
                      data-icon="account_circle"
                    >
                      account_circle
                    </span>
                    <span class="font-medium">個人帳戶設定</span>
                  </a>
                </MenuItem>
              </div>
              <div class="h-px bg-outline-variant/10"></div>
              <div class="p-2">
                <MenuItem v-slot="{ active }">
                  <a
                    :class="[
                      active ? 'bg-error-container/10' : '',
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-error transition-colors',
                    ]"
                    href="#"
                    @click.prevent="logout"
                  >
                    <span
                      class="material-symbols-outlined text-[20px]"
                      data-icon="logout"
                    >
                      logout
                    </span>
                    <span class="font-medium">登出系統</span>
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MgmtLayoutDefaultHeader',
})

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'

import { useRouter } from 'vue-router'
import { useDialogStore } from '@/stores/dialog'
import SvcLogout from '@/services/admin/Logout'

const router = useRouter() // 路由
const storeDialog = useDialogStore() // 狀態管理-對話框
const svcLogout = new SvcLogout() // 服務層-帳號-登出

defineProps<{
  title: string
}>()

/**
 * 登出
 *
 * @returns {Promise<void>}
 */
const logout = async (): Promise<void> => {
  const result = await svcLogout.logout()

  if (result.status === false) {
    storeDialog.show(result.message, 'error')
    return
  }

  // 登出成功
  router.push('/mgmt/login')
}
</script>
