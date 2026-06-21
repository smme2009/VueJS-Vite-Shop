<template>
  <div
    class="w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-surface-container-lowest mt-20 border-t-0 font-inter text-xs tracking-widest uppercase"
  >
    <div class="flex flex-col items-center md:items-start gap-2">
      <span class="font-manrope font-bold text-lg text-[#005145]"
        >CURATOR</span
      >
      <p class="text-on-surface-variant normal-case tracking-normal">
        © 2024 CURATOR 編輯電商。保留所有權利。
      </p>
    </div>
    <div class="flex gap-8">
      <a
        class="text-on-surface-variant hover:text-[#005145] transition-colors"
        href="#"
        >隱私權政策</a
      >
      <a
        class="text-on-surface-variant hover:text-[#005145] transition-colors"
        href="#"
        >服務條款</a
      >
      <a
        class="text-on-surface-variant hover:text-[#005145] transition-colors"
        href="#"
        >運送與退貨</a
      >
      <a
        class="text-on-surface-variant hover:text-[#005145] transition-colors"
        href="#"
        >聯絡我們</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MgmtLayoutDefaultFooter',
})
</script>
