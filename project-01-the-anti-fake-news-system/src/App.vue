<template>
  <div class="min-h-screen bg-black">
    <Navbar @filter-changed="handleFilterChange" />

    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <NewsBoxes :items="[]" />
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue'
import NewsBoxes from '@/components/NewsBoxes.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    NewsBoxes,
  },
  methods: {
    handleFilterChange(filter: string) {
      // Handle filter changes here
      // This will be implemented when news functionality is added
      console.log('Filter changed to:', filter)
    }
  }
}
</script>
