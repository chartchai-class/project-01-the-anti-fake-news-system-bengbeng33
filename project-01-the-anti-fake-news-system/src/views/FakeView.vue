<template>
  <div class="min-h-screen bg-black">
    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <h1 class="text-3xl font-bold text-white mb-6">Fake News</h1>
      <NewsBoxes :items="fakeNews" />
    </div>
  </div>
</template>

<script lang="ts">
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

export default {
  name: 'FakeView',
  components: {
    NewsBoxes
  },
  computed: {
    fakeNews(): NewsItem[] {
      return (data as { news: NewsItem[] }).news.filter(
        (item: NewsItem) => item.status === 'FAKE'
      )
    }
  }
}
</script>
