<template>
  <div class="min-h-screen">
    <AppNavigation 
      :items-per-page="itemsPerPage"
      @update:items-per-page="updateItemsPerPage"
    />
    <router-view :items-per-page="itemsPerPage" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNavigation from '@/components/Navbar.vue'

const itemsPerPage = ref(6)

function updateItemsPerPage(value: number) {
  itemsPerPage.value = value
}
</script>