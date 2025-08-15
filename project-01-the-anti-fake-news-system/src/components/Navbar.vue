<template>
  <nav class="bg-orange-500 shadow-lg border-b border-orange-600">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Left side: Logo and Web Text -->
        <div class="flex items-center space-x-4">
          <!-- Web Logo -->
          <div class="flex-shrink-0">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.gif" 
                alt="Daybreak News Logo" 
                class="w-full h-full object-contain"
              />
            </div>
          </div>
          <!-- Web Text -->
          <div class="text-4xl font-bold text-white">
            Daybreak News
          </div>
        </div>

        <!-- Right side: Navigation Links and Pagination Control -->
        <div class="flex items-center space-x-4">
          <!-- Navigation Links -->
          <div class="flex space-x-4">
            <!-- All News -->
            <router-link 
              to="/"
              :class="[
                'px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200 w-20 text-center',
                $route.path === '/' 
                  ? 'bg-white text-orange-700' 
                  : 'text-white hover:text-orange-200 hover:bg-orange-600'
              ]"
            >
              All
            </router-link>
            
            <!-- Fact News -->
            <router-link 
              to="/fact"
              :class="[
                'px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200 w-20 text-center',
                $route.path === '/fact' 
                  ? 'bg-white text-green-700' 
                  : 'text-white hover:text-orange-200 hover:bg-orange-600'
              ]"
            >
              Fact
            </router-link>
            
            <!-- Fake News -->
            <router-link 
              to="/fake"
              :class="[
                'px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200 w-20 text-center',
                $route.path === '/fake' 
                  ? 'bg-white text-red-700' 
                  : 'text-white hover:text-orange-200 hover:bg-orange-600'
              ]"
            >
              Fake
            </router-link>
          </div>

          <!-- Pagination Control -->
          <PaginationControl 
            v-model="localItemsPerPage"
            @update:modelValue="updateItemsPerPage"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PaginationControl from './PaginationControl.vue'

interface Props {
  itemsPerPage: number
}

const props = defineProps<Props>()
const localItemsPerPage = ref(props.itemsPerPage)

// Watch for external changes to itemsPerPage prop
watch(() => props.itemsPerPage, (newValue) => {
  localItemsPerPage.value = newValue
})

function updateItemsPerPage(value: number) {
  localItemsPerPage.value = value
  // Emit event to parent component
  emit('update:itemsPerPage', value)
}

// Define emits
const emit = defineEmits<{
  'update:itemsPerPage': [value: number]
}>()
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
