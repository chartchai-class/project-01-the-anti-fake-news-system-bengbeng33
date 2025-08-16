<template>
  <div class="min-h-screen ">
    <!-- Loading Progress Bar -->
    <div v-if="loading" class="fixed top-0 left-0 right-0 z-50">
      <div class="h-1 bg-blue-200">
        <div 
          class="h-full bg-blue-500 transition-all duration-300 ease-out"
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
        <h1 class="absolute inset-0 grid place-items-center z-10 pointer-events-none">
          <span class="px-4 py-1 rounded-xl text-black text-3xl sm:text-4xl font-bold tracking-wide backdrop-blur-[1px]">
            News Detail
          </span>
        </h1>
      </div>
    </div>

    <div v-if="!newsItem" class="text-white text-center py-20">
      <p class="text-xl">News not found</p>
      <router-link to="/" class="text-orange-500 hover:text-orange-300 mt-4 inline-block">
        ← Back to All News
      </router-link>
    </div>

    <div v-else class="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
      <!-- Main Card: Left (details) / Right (status) -->
      <div class="bg-white/95 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Left side -->
        <div class="lg:col-span-3">
          <h1 class="text-2xl font-bold text-gray-900">{{ newsItem.title }}</h1>
          <div class="mt-2 flex items-center justify-between text-sm text-gray-600">
            <div>
              by <span class="font-medium">{{ newsItem.reporter }}</span>
              at <time :datetime="newsItem.reportedAt">{{ formatDate(newsItem.reportedAt) }}</time>
            </div>
            <router-link
              :to="{ name: 'comments', params: { id: newsId } }"
              class="px-4 py-1.5 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Comment
            </router-link>
          </div>

          <!-- Image -->
          <img
            v-if="newsItem.imageUrl"
            :src="newsItem.imageUrl"
            :alt="newsItem.title"
            class="max-w-none h-auto object-scale-down rounded-lg mt-4"          />

        </div>

        <!-- Right side -->
        <div class="flex flex-col items-center mt-10">
          <h2 class="text-2xl font-bold text-gray-900">Current Status</h2>
          <div class="flex items-center justify-center mt-4">
            <img
              :src="currentStatusImage"
              :alt="currentStatusText"
              class="w-48 h-48 object-contain"
            />
          </div>
          <router-link
            :to="{ name: 'vote', params: { id: newsId } }"
            class="mt-6 px-8 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            vote
          </router-link>
        </div>
        <!-- Short description -->
          <div class="lg:col-span-4 ml-4 text-gray-800 leading-relaxed">
            <p>{{ newsItem.content }}</p>
          </div>
      </div>
      
      <!-- Back button -->
      <div class="mt-8 text-center">
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Back
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '../stores/news'

type Status = 'FAKE' | 'NOT_FAKE' | null

interface Props {
  id: string
}

const props = defineProps<Props>()
const route = useRoute()
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
    loadingProgress.value += Math.random() * 35
    if (loadingProgress.value >= 100) {
      loadingProgress.value = 100
      setTimeout(() => {
        loading.value = false
        loadingProgress.value = 0
      }, 200)
      clearInterval(interval)
    }
  }, 70)
}

// Get news ID
const newsId = computed(() => props.id || route.params.id as string)

// Computed properties using Pinia getters
const newsItem = computed(() => newsStore.getNewsById(newsId.value))

const currentStatus = computed((): Status => {
  return newsStore.getCurrentStatus(newsId.value)
})

const currentStatusText = computed(() => {
  switch (currentStatus.value) {
    case 'FAKE': return 'FAKE'
    case 'NOT_FAKE': return 'FACT'
    default: return 'UNVERIFIED'
  }
})

const currentStatusClass = computed(() => {
  switch (currentStatus.value) {
    case 'FAKE': return 'bg-red-100 border-red-300 text-red-700'
    case 'NOT_FAKE': return 'bg-green-100 border-green-300 text-green-700'
    default: return 'bg-gray-100 border-gray-300 text-gray-700'
  }
})

const currentStatusImage = computed(() => {
  switch (currentStatus.value) {
    case 'FAKE': return '/Fake.png'
    case 'NOT_FAKE': return '/Fact.png'
    default: return '/Equal.png'
  }
})

function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('en-US', { 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  })
}
</script>