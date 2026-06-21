<template>
  <div class="bg-surface text-on-surface flex min-h-screen">
    <MgmtSidebar />
    <main class="flex-1 flex flex-col min-w-0 bg-surface">
      <MgmtHeader :title="title" />
      <div class="mt-16 p-8 overflow-y-auto">
        <slot />
        <MgmtFooter />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MgmtLayoutDefault',
})

import MgmtFooter from '@/views/mgmt/layout/default/components/footer.vue'
import MgmtHeader from '@/views/mgmt/layout/default/components/header.vue'
import MgmtSidebar from '@/views/mgmt/layout/default/components/sidebar.vue'

defineProps<{
  title: string
}>()
</script>
