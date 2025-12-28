<template>
  <CompDialog />
  <div class="h-screen w-full">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import CompDialog from '@/components/dialog/dialog.vue'
</script>
