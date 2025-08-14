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
          <button 
            @click="setActiveFilter('all')" 
            :class="[
              'px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200 w-20',
              activeFilter === 'all' 
                ? 'bg-white text-orange-700' 
                : 'text-white hover:text-orange-200 hover:bg-orange-600'
            ]"
          >
            All
          </button>
          
          <!-- Fact News -->
          <button 
            @click="setActiveFilter('fact')" 
            :class="[
              'px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200 w-20',
              activeFilter === 'fact' 
                ? 'bg-white text-green-700' 
                : 'text-white hover:text-orange-200 hover:bg-orange-600'
            ]"
          >
            Fact
          </button>
          
          <!-- Fake News -->
          <button 
            @click="setActiveFilter('fake')" 
            :class="[
              'px-6 py-2 rounded-md text-lg font-medium transition-colors duration-200 w-20',
              activeFilter === 'fake' 
                ? 'bg-white text-red-700' 
                : 'text-white hover:text-orange-200 hover:bg-orange-600'
            ]"
          >
            Fake
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      activeFilter: 'all'
    }
  },
  methods: {
    setActiveFilter(filter) {
      this.activeFilter = filter
      // Emit event to parent component to handle news filtering
      this.$emit('filter-changed', filter)
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
