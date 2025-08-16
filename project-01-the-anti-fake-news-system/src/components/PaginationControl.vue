<template>
  <div class="relative">
    <!-- Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg border border-orange-300 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
    >
      <span class="font-medium">{{ itemsPerPage }} per page</span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 sm:right-0 -right-8 mt-2 w-48 bg-white rounded-lg shadow-lg border border-orange-200 z-50"
    >
      <div class="py-1">
        <button
          v-for="option in pageSizeOptions"
          :key="option"
          @click="selectItemsPerPage(option)"
          class="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 transition-colors duration-150"
          :class="{ 'bg-orange-100 text-orange-700 font-medium': option === itemsPerPage }"
        >
          {{ option }} per page
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue: number
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isOpen = ref(false)
const itemsPerPage = ref(props.modelValue)

const pageSizeOptions = [3, 6, 9, 12, 15]

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectItemsPerPage(value: number) {
  itemsPerPage.value = value
  emit('update:modelValue', value)
  isOpen.value = false
}

// Close dropdown when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  itemsPerPage.value = newValue
})

// Add click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Additional styles if needed */
</style>
