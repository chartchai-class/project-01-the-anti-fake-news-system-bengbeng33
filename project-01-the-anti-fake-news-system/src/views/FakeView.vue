<template>
  <div class="min-h-screen ">
    <!-- Loading Progress Bar -->
    <div v-if="loading" class="fixed top-0 left-0 right-0 z-50">
      <div class="h-1 bg-red-200">
        <div 
          class="h-full bg-red-500 transition-all duration-300 ease-out"
          :style="{ width: loadingProgress + '%' }"
        ></div>
      </div>
    </div>

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
            Fake News
          </span>
        </h1>
      </div>
    </div>
    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <NewsBoxes :items="paginatedFakeNews" />
      <div class="mt-6 flex justify-center">
        <PageNav v-model="currentPage" :total="totalPages" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import NewsBoxes from '@/components/NewsBoxes.vue'
import PageNav from '@/components/PageNav.vue'
import { useNewsStore } from '@/stores/news'

interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  status: 'FAKE' | 'NOT_FAKE' | null
  currentStatus?: 'FAKE' | 'NOT_FAKE' | null
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

const newsStore = useNewsStore()

// Loading states
const loading = ref(false)
const loadingProgress = ref(0)

// Simulate loading when component mounts
onMounted(() => {
  simulateLoading()
})

function simulateLoading() {
  loading.value = true
  loadingProgress.value = 0
  
  const interval = setInterval(() => {
    loadingProgress.value += Math.random() * 30
    if (loadingProgress.value >= 100) {
      loadingProgress.value = 100
      setTimeout(() => {
        loading.value = false
        loadingProgress.value = 0
      }, 200)
      clearInterval(interval)
    }
  }, 80)
}

const fakeNews = computed((): NewsItem[] => {
  return newsStore.getNewsWithCurrentVotes().filter(
    (item: NewsItem) => (item.currentStatus || item.status) === 'FAKE'
  )
})

const currentPage = ref(1)

const totalPages = computed(() => {
  const total = fakeNews.value.length
  return total > 0 ? Math.ceil(total / props.itemsPerPage) : 0
})

watch([() => props.itemsPerPage, fakeNews], () => {
  if (totalPages.value === 0) {
    currentPage.value = 1
    return
  }
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
  if (currentPage.value < 1) currentPage.value = 1
})

const paginatedFakeNews = computed((): NewsItem[] => {
  if (totalPages.value === 0) return []
  const start = (currentPage.value - 1) * props.itemsPerPage
  return fakeNews.value.slice(start, start + props.itemsPerPage)
})
</script>