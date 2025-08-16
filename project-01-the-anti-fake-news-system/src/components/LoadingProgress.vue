<template>
  <div v-if="isLoading" class="fixed top-0 left-0 right-0 z-50">
    <!-- Main Progress Bar -->
    <div class="h-1 bg-orange-200">
      <div 
        class="h-full bg-orange-500 transition-all duration-300 ease-out"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    
    <!-- Optional Overlay with Spinner (for heavier loading) -->
    <div v-if="showOverlay" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 flex items-center space-x-4 shadow-xl">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <span class="text-gray-700 font-medium">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean
  progress: number
  showOverlay?: boolean
  message?: string
}

withDefaults(defineProps<Props>(), {
  showOverlay: false,
  message: 'Loading...'
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>