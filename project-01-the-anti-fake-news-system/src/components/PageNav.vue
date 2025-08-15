<template>
  <div class="flex items-center justify-center gap-4">
    <button
      type="button"
      @click="goPrev"
      :disabled="isPrevDisabled"
      class="px-4 py-2 rounded-lg border transition-all duration-150
             bg-white/90 text-gray-800 border-gray-300 shadow-sm hover:shadow
             hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Previous page"
    >
      Prev
    </button>

    <span
      class="min-w-10 text-center font-semibold text-white bg-orange-500/90 px-3 py-2 rounded-lg"
      aria-live="polite"
    >
      {{ currentPage }}
    </span>

    <button
      type="button"
      @click="goNext"
      :disabled="isNextDisabled"
      class="px-4 py-2 rounded-lg border transition-all duration-150
             bg-white/90 text-gray-800 border-gray-300 shadow-sm hover:shadow
             hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Next page"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  total: number
}

type Emits = (e: 'update:modelValue', value: number) => void

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentPage = computed(() => props.modelValue)

const isPrevDisabled = computed(() => currentPage.value <= 1)
const isNextDisabled = computed(() => props.total <= 0 || currentPage.value >= Math.max(1, props.total))

function goPrev() {
  if (isPrevDisabled.value) return
  emit('update:modelValue', currentPage.value - 1)
}

function goNext() {
  if (isNextDisabled.value) return
  emit('update:modelValue', currentPage.value + 1)
}
</script>

<style scoped>
/* Intentionally left for future component-level styles */
</style>


