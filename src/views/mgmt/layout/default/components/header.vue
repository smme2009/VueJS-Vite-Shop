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
        <button class="hover:opacity-70 transition-opacity relative">
          <span
            class="material-symbols-outlined"
            data-icon="notifications"
          >
            notifications
          </span>
          <span
            class="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-surface"
          ></span>
        </button>
        <button class="hover:opacity-70 transition-opacity">
          <span class="material-symbols-outlined" data-icon="person">
            person
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MgmtLayoutDefaultHeader',
})

defineProps<{
  title: string
}>()
</script>
