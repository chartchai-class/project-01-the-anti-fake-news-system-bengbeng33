<template>
  <div class="min-h-screen bg-black">
    <div class="flex justify-center">
      <div class="relative inline-block -mt-2 mb-6">
        <img
          src="/H.png"
          alt="Daybreak banner"
          class="w-[520px] max-w-full h-auto pointer-events-none select-none"
        />
        <h1
          class="absolute inset-0 grid place-items-center z-10 pointer-events-none"
        >
          <span
            class="px-4 py-1 rounded-xl text-Black text-3xl sm:text-4xl font-bold tracking-wide backdrop-blur-[1px]"
          >
            All News
          </span>
        </h1>
      </div>
    </div>
    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <NewsBoxes :items="paginatedNews" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import NewsBoxes from '@/components/NewsBoxes.vue'
import data from '@/data/db.json'

interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  status: 'FAKE' | 'NOT_FAKE' | null
  reporter: string
  reportedAt: string
  imageUrl: string
  stats: { fake: number; notFake: number }
}

interface Props {
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 6
})

const allNews = computed((): NewsItem[] => {
  return (data as { news: NewsItem[] }).news
})

const paginatedNews = computed((): NewsItem[] => {
  return allNews.value.slice(0, props.itemsPerPage)
})
</script>