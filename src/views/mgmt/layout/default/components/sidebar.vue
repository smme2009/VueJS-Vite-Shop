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
        <div
          class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-bold overflow-hidden"
        >
          <img
            alt="管理員頭像"
            class="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZMZBBCxeiTWcytwWiZ71ZGNbQ1bt6hMCD6BQbQ1eIFajLxg8h_fEQdP3UN7I0Fi2CdteQ8yQVdvDlT_fFYejESGRyrIKVMZW3sGeFeawCgF4mjgmeI_XTtMFpoNyq46bVzT-ZMlnpHfwuIV3A73q7RB5DC24NtQOvgptE8XsXwWXaLmOYtQeoDrOOTxvHkExiEQoSoZ3k1-FnDQEUnF8foVaj5uAyRaQM_a2-mWVOkEjJo02CIWf0YAmAiEGM1PbeJacE4St3Oe0"
          />
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-xs font-bold truncate">管理員用戶</span>
          <span class="text-[10px] text-on-surface-variant truncate"
            >管理套件</span
          >
        </div>
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
defineOptions({
  name: 'MgmtLayoutDefaultSidebar',
})
</script>
