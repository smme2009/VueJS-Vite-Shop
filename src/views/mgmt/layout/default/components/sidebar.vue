<template>
  <div
    class="flex flex-col h-screen sticky left-0 top-0 p-4 bg-surface-container-low h-full w-64 border-r-0 font-inter text-sm font-medium z-40"
  >
    <div class="mb-10 px-2">
      <span
        class="font-manrope font-bold text-[#005145] text-xl tracking-tighter"
        >CURATOR</span
      >
      <div class="mt-1">
        <p
          class="text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60"
        >
          管理員控制台
        </p>
      </div>
    </div>
    <nav class="flex-1 space-y-1">
      <a
        class="flex items-center gap-3 px-3 py-2.5 bg-white text-[#005145] rounded-md shadow-sm transition-all duration-200 ease-in-out group"
        href="#"
      >
        <span class="material-symbols-outlined text-[20px]"
          >dashboard</span
        >
        <span>資訊總覽</span>
      </a>
      <a
        class="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-highest transition-all duration-200 ease-in-out rounded-md"
        href="#"
      >
        <span class="material-symbols-outlined text-[20px]"
          >inventory_2</span
        >
        <span>商品管理</span>
      </a>
      <a
        class="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-highest transition-all duration-200 ease-in-out rounded-md"
        href="#"
      >
        <span class="material-symbols-outlined text-[20px]"
          >shopping_cart</span
        >
        <span>訂單管理</span>
      </a>
      <a
        class="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-container-highest transition-all duration-200 ease-in-out rounded-md"
        href="#"
      >
        <span class="material-symbols-outlined text-[20px]"
          >group</span
        >
        <span>用戶管理</span>
      </a>
    </nav>
    <div class="mt-auto pt-6 border-t border-outline-variant/20">
      <div class="flex items-center gap-3 px-2">
        <AdminProfile />
        <button
          class="ml-auto text-on-surface-variant hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined text-[18px]"
            >settings</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminProfile from '@/components/mgmt/adminProfile.vue'

defineOptions({
  name: 'MgmtLayoutDefaultSidebar',
})
</script>
