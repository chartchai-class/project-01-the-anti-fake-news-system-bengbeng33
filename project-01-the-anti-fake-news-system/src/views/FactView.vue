<template>
  <div class="min-h-screen ">
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
            Fact News
          </span>
        </h1>
      </div>
    </div>
    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <NewsBoxes :items="paginatedFactNews" />
      <div class="mt-6 flex justify-center">
        <PageNav v-model="currentPage" :total="totalPages" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import NewsBoxes from '@/components/NewsBoxes.vue'
import PageNav from '@/components/PageNav.vue'
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

const factNews = computed((): NewsItem[] => {
  return (data as { news: NewsItem[] }).news.filter(
    (item: NewsItem) => item.status === 'NOT_FAKE'
  )
})

const currentPage = ref(1)

const totalPages = computed(() => {
  const total = factNews.value.length
  return total > 0 ? Math.ceil(total / props.itemsPerPage) : 0
})

watch([() => props.itemsPerPage, factNews], () => {
  if (totalPages.value === 0) {
    currentPage.value = 1
    return
  }
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
  if (currentPage.value < 1) currentPage.value = 1
})

const paginatedFactNews = computed((): NewsItem[] => {
  if (totalPages.value === 0) return []
  const start = (currentPage.value - 1) * props.itemsPerPage
  return factNews.value.slice(start, start + props.itemsPerPage)
})
</script>
