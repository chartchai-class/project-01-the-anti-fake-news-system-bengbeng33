<template>
  <nav class="bg-orange-500 shadow-lg border-b border-orange-600">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Left side: Logo and Web Text -->
        <div class="flex items-center space-x-4">
          <!-- Web Logo and Text Container (Dropdown trigger) -->
          <div class="flex-shrink-0 relative">
            <button
              @click="toggleDropdown"
              class="flex items-center space-x-4 focus:outline-none"
            >
              <!-- Logo -->
              <div class="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.gif" 
                  alt="Daybreak News Logo" 
                  class="w-full h-full object-contain"
                />
              </div>
              <!-- Web Text -->
              <div class="text-2xl sm:text-4xl font-bold text-white">
                Daybreak News
              </div>
            </button>
            <!-- Dropdown menu (mobile only) -->
            <transition name="slide">
              <div
                v-if="dropdownOpen"
                class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 flex flex-col sm:hidden border border-gray-200"
              >
                <router-link
                  to="/"
                  class="px-4 py-3 hover:bg-orange-50 text-orange-700 font-medium transition-colors duration-200"
                  @click="closeDropdown"
                >
                  All
                </router-link>
                <router-link
                  to="/fact"
                  class="px-4 py-3 hover:bg-green-50 text-green-700 font-medium transition-colors duration-200"
                  @click="closeDropdown"
                >
                  Fact
                </router-link>
                <router-link
                  to="/fake"
                  class="px-4 py-3 hover:bg-red-50 text-red-700 font-medium transition-colors duration-200"
                  @click="closeDropdown"
                >
                  Fake
                </router-link>
                <div class="border-t border-gray-200 my-2"></div>
                <!-- PaginationControl - Direct display -->
                <div v-if="$route.path === '/' || $route.path === '/fact' || $route.path === '/fake'" class="px-4 py-2">
                  <PaginationControl
                    v-model="localItemsPerPage"
                    @update:modelValue="updateItemsPerPage"
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Right side: Navigation Links and Pagination Control (hidden on mobile) -->
        <div class="hidden sm:flex items-center space-x-4">
          <!-- Navigation Links -->
          <div class="flex space-x-4">
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
          <!-- Pagination Control - Only show on home page and fact/fake pages -->
          <PaginationControl 
            v-if="$route.path === '/' || $route.path === '/fact' || $route.path === '/fake'"
            v-model="localItemsPerPage"
            @update:modelValue="updateItemsPerPage"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import PaginationControl from './PaginationControl.vue'

interface Props {
  itemsPerPage: number
}

const props = defineProps<Props>()
const localItemsPerPage = ref(props.itemsPerPage)

// Responsive dropdown states
const dropdownOpen = ref(false)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function closeDropdown() {
  dropdownOpen.value = false
}

// Close dropdown when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.flex-shrink-0')) {
    closeDropdown()
  }
}

// Close dropdown on escape key
function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeDropdown()
  }
}

// Watch for external changes to itemsPerPage prop
watch(() => props.itemsPerPage, (newValue) => {
  localItemsPerPage.value = newValue
})

function updateItemsPerPage(value: number) {
  localItemsPerPage.value = value
  emit('update:itemsPerPage', value)
}

// Define emits
const emit = defineEmits<{
  'update:itemsPerPage': [value: number]
}>()

// Close dropdown on route change
import { useRoute } from 'vue-router'
const route = useRoute()
watch(() => route.path, closeDropdown)

// Add event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
.slide-enter-to, .slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>