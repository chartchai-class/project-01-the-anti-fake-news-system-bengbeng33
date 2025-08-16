<template>
  <div class="min-h-screen ">
    <!-- Loading Progress Bar -->
    <div v-if="loading" class="fixed top-0 left-0 right-0 z-50">
      <div class="h-1 bg-orange-200">
        <div 
          class="h-full bg-orange-500 transition-all duration-300 ease-out"
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
            All News
          </span>
        </h1>
      </div>
    </div>

    <!-- Add News Button -->
    <div class="px-4 sm:px-6 lg:px-8 mb-4">
      <div class="flex justify-center">
        <button
          @click="showAddNewsModal = true"
          class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          + Add News
        </button>
      </div>
    </div>

    <!-- Add News Modal -->
    <div v-if="showAddNewsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Add New News</h3>
        
        <form @submit.prevent="addNews" class="space-y-4">
          <!-- Topic -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Topic *</label>
            <input
              v-model="newNews.topic"
              type="text"
              required
              placeholder="Enter news topic"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              v-model="newNews.description"
              rows="4"
              required
              placeholder="Enter news description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>
          
          <!-- Reporter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Reporter *</label>
            <input
              v-model="newNews.reporter"
              type="text"
              required
              placeholder="Reporter name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <!-- Image URL -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
            <input
              v-model="newNews.imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          

          
          <div class="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              @click="showAddNewsModal = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!newNews.topic.trim() || !newNews.description.trim() || !newNews.reporter.trim()"
              class="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add News
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <NewsBoxes :items="paginatedNews" />
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

// Add news modal state
const showAddNewsModal = ref(false)
const newNews = ref({
  topic: '',
  description: '',
  reporter: '',
  imageUrl: ''
})

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
  }, 100)
}

const allNews = computed((): NewsItem[] => {
  return newsStore.getNewsWithCurrentVotes()
})

const currentPage = ref(1)

const totalPages = computed(() => {
  const total = allNews.value.length
  return total > 0 ? Math.ceil(total / props.itemsPerPage) : 0
})

watch([() => props.itemsPerPage, allNews], () => {
  if (totalPages.value === 0) {
    currentPage.value = 1
    return
  }
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
  if (currentPage.value < 1) currentPage.value = 1
})

const paginatedNews = computed((): NewsItem[] => {
  if (totalPages.value === 0) return []
  const start = (currentPage.value - 1) * props.itemsPerPage
  return allNews.value.slice(start, start + props.itemsPerPage)
})

function addNews() {
  if (!newNews.value.topic.trim() || !newNews.value.description.trim() || !newNews.value.reporter.trim()) {
    return
  }

  // Show loading for adding news
  loading.value = true
  loadingProgress.value = 0
  
  // Simulate API call delay
  const interval = setInterval(() => {
    loadingProgress.value += 25
    if (loadingProgress.value >= 100) {
      clearInterval(interval)
      
      // Add news to store with null status (Unverified) and 0/0 votes
      newsStore.addNews({
        title: newNews.value.topic,
        content: newNews.value.description,
        reporter: newNews.value.reporter,
        imageUrl: newNews.value.imageUrl || `https://picsum.photos/id/${Math.floor(Math.random() * 200) + 100}/800/400`,
        status: null // Automatically set to Unverified
      })

      // Reset form and close modal
      newNews.value = {
        topic: '',
        description: '',
        reporter: '',
        imageUrl: ''
      }
      showAddNewsModal.value = false
      
      setTimeout(() => {
        loading.value = false
        loadingProgress.value = 0
      }, 200)
    }
  }, 100)
}
</script>