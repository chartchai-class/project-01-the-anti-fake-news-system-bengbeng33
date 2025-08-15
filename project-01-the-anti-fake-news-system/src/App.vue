<template>
  <div class="min-h-screen bg-black">
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
