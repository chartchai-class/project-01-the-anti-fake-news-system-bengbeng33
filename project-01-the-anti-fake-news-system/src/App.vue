<template>
  <div class="min-h-screen">
    <Navbar @filter-changed="handleFilterChange" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    handleFilterChange(filter) {
      // Handle filter changes here
      // This will be implemented when news functionality is added
      console.log('Filter changed to:', filter)
    }
  }
}
</script>