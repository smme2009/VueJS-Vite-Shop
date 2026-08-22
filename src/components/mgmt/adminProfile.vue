<template>
  <div class="flex items-center gap-3 min-w-0">
    <div
      class="w-10 h-10 shrink-0 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-bold overflow-hidden"
    >
      {{ firstLetter }}
    </div>
    <div class="flex flex-col min-w-0">
      <span
        class="text-sm font-bold font-manrope truncate text-on-surface"
      >
        {{ storeName }}
      </span>
      <span
        class="text-[10px] text-on-surface-variant uppercase tracking-wider truncate"
      >
        系統管理員
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AdminProfile',
})

import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/stores/admin'

const storeAdmin = useAdminStore()

const { storeName } = storeToRefs(storeAdmin)
const firstLetter = computed(() => storeName.value.charAt(0))
</script>
