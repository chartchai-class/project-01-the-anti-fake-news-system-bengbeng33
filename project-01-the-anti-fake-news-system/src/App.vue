<template>
  <div class="min-h-screen bg-black">
    <Navbar @filter-changed="handleFilterChange" />

    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <!-- ส่ง array ว่าง เพื่อให้ NewsBoxes แสดงกล่อง placeholder -->
      <NewsBoxes :items="[]" />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import NewsBoxes from './components/NewsBoxes.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    NewsBoxes
  },
  methods: {
    handleFilterChange(filter) {
      console.log('Filter changed to:', filter)
    }
  }
}
</script>
