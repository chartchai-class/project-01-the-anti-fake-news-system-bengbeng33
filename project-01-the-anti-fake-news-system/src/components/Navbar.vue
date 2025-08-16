<template>
  <nav class="bg-orange-500 shadow-lg border-b border-orange-600">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Left side: Logo and Web Text -->
        <div class="flex items-center space-x-4">
          <!-- Web Logo (Dropdown trigger on mobile) -->
          <div class="flex-shrink-0 relative">
            <button
              @click="toggleDropdown"
              class="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden focus:outline-none"
            >
              <img 
                src="/logo.gif" 
                alt="Daybreak News Logo" 
                class="w-full h-full object-contain"
              />
            </button>
            <!-- Dropdown menu (mobile only) -->
            <transition name="fade">
              <div
                v-if="dropdownOpen"
                class="absolute left-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-50 flex flex-col sm:hidden"
              >
                <router-link
                  to="/"
                  class="px-4 py-2 hover:bg-orange-100 text-orange-700 font-medium"
                  @click="closeDropdown"
                >All</router-link>
                <router-link
                  to="/fact"
                  class="px-4 py-2 hover:bg-orange-100 text-green-700 font-medium"
                  @click="closeDropdown"
                >Fact</router-link>
                <router-link
                  to="/fake"
                  class="px-4 py-2 hover:bg-orange-100 text-red-700 font-medium"
                  @click="closeDropdown"
                >Fake</router-link>
                <div class="border-t my-1"></div>
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
          <!-- Web Text -->
          <div class="text-2xl sm:text-4xl font-bold text-white">
            Daybreak News
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
import { ref, watch } from 'vue'
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

// Close dropdown on route change (optional)
import { useRoute } from 'vue-router'
const route = useRoute()
watch(() => route.path, closeDropdown)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>