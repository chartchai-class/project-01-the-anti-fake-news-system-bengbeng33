<template>
  <section class="w-full bg-black/95 rounded-2xl p-3 sm:p-4 lg:p-6">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-8 mx-auto max-w-[684px] md:max-w-[1038px] justify-items-center">
      <div
        v-for="i in boxes"
        :key="i"
        class="rounded-2xl bg-white"
        :style="{
          height: '210px',
          width: '350px'
        }"
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

/**
 * Render a grid of empty boxes only.
 * - boxes: how many boxes to render (default 6)
 */
withDefaults(defineProps<{ boxes?: number }>(), {
  boxes: 6
})
</script>

<style scoped>
/* Additional custom styling if needed */
</style>
