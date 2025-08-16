<template>
  <div class="min-h-screen">
    <!-- Loading Progress Bar -->
    <div v-if="loading" class="fixed top-0 left-0 right-0 z-50">
      <div class="h-1 bg-indigo-200">
        <div 
          class="h-full bg-indigo-500 transition-all duration-300 ease-out"
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
            Comments
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

    <div v-else class="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto">
      <!-- News Title -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-white mb-2">{{ newsItem.title }}</h2>
        <p class="text-gray-300 text-sm">Comments and discussions</p>
      </div>

      <!-- Comments Section -->
      <div class="bg-white/95 rounded-2xl p-6">
        <!-- Header with Add Comment Button -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">Comments</h3>
          <button
            @click="showAddComment = true"
            class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            Add Comment
          </button>
        </div>

        <!-- Add Comment Modal -->
        <div v-if="showAddComment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Add a Comment</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  v-model="newComment.user"
                  type="text"
                  placeholder="Enter your username"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  v-model="newComment.text"
                  rows="4"
                  placeholder="Write your comment..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
                <input
                  v-model="newComment.imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button
                @click="showAddComment = false"
                class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="addComment"
                :disabled="!newComment.text.trim()"
                class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>

        <!-- Comments List -->
        <div class="space-y-4">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="bg-gray-100 rounded-lg p-4"
          >
            <!-- Username -->
            <div class="font-medium text-gray-900 mb-2">{{ comment.user }}</div>
            
            <!-- Comment Image (if exists) -->
            <img
              v-if="comment.imageUrl"
              :src="comment.imageUrl"
              :alt="`Image by ${comment.user}`"
              class="w-full h-48 object-cover rounded-lg mb-3"
            />
            
            <!-- Comment Text -->
            <p class="text-gray-700 leading-relaxed">{{ comment.text }}</p>
            
            <!-- Comment Date -->
            <div class="text-sm text-gray-500 mt-2">
              {{ formatDate(comment.createdAt) }}
            </div>
          </div>
        </div>

        <!-- No Comments Message -->
        <div v-if="comments.length === 0" class="text-center py-8">
          <p class="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      </div>
      
      <!-- Back button -->
      <div class="mt-8 text-center">
        <router-link
          :to="{ name: 'news-detail', params: { id: newsId } }"
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
const comments = computed(() => newsStore.getComments(newsId.value))

// Add comment modal state
const showAddComment = ref(false)
const newComment = ref({
  user: '',
  text: '',
  imageUrl: ''
})

// Initialize comments for this news item
newsStore.initializeComments(newsId.value)

// Add comment function
function addComment() {
  if (newComment.value.text.trim()) {
    newsStore.addComment(newsId.value, {
      user: newComment.value.user || 'Anonymous',
      text: newComment.value.text,
      imageUrl: newComment.value.imageUrl || undefined
    })
    
    // Reset form and close modal
    newComment.value = { user: '', text: '', imageUrl: '' }
    showAddComment.value = false
  }
}

// Format date function
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