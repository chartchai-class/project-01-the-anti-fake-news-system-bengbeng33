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
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <!-- Web Text -->
          <div class="text-4xl font-bold text-white">
            Daybreak News
          </div>
        </div>

        <!-- Right side: Navigation Links -->
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
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'NavBar'
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
