<template>
  <TransitionRoot :show="storeDialog.storeVisible" as="template">
    <Dialog class="relative z-[100]" @close="storeDialog.hide">
      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-150 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-on-background/30 backdrop-blur-sm transition"
        />
      </TransitionChild>
      <div
        class="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto"
      >
        <TransitionChild
          as="template"
          enter="duration-200 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="relative bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl p-6 md:p-8 border border-outline-variant/20 transition transform"
          >
            <div class="flex flex-col items-center text-center">
              <div
                class="mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-surface-container-high"
              >
                <span
                  class="material-symbols-outlined text-3xl"
                  :class="iconConfig.colorClass"
                >
                  {{ iconConfig.icon }}
                </span>
              </div>
              <DialogTitle
                class="editorial-headline text-xl font-bold text-on-surface mb-2"
              >
                系統訊息
              </DialogTitle>
              <DialogDescription
                class="text-sm text-on-surface-variant leading-relaxed mb-8 whitespace-pre-line"
              >
                {{ storeDialog.storeMessage }}
              </DialogDescription>
              <button
                class="w-full bg-primary text-on-primary py-3 px-6 rounded-md font-bold text-sm tracking-wide shadow-md hover:opacity-90 transition-all duration-300 active:scale-[0.98]"
                @click="storeDialog.hide"
              >
                確定
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
defineOptions({ name: 'CompDialog' })

import { computed } from 'vue'
import { useDialogStore } from '@/stores/dialog'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'

const storeDialog = useDialogStore()

const iconConfig = computed(() => {
  switch (storeDialog.storeType) {
    case 'success':
      return {
        icon: 'check_circle',
        colorClass: 'text-green-500',
      }
    case 'error':
      return {
        icon: 'cancel',
        colorClass: 'text-red-500',
      }
    case 'info':
    default:
      return {
        icon: 'info',
        colorClass: 'text-on-surface-variant',
      }
  }
})
</script>
