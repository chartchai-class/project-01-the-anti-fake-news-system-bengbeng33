<template>
  <div class="min-h-screen bg-black">
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

    <div v-else class="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <!-- Main News Detail Card -->
      <div class="bg-white/95 rounded-2xl p-6 mb-6">
        <div class="flex justify-between items-start">
          <div class="flex-1 pr-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">{{ newsItem.title }}</h1>
            
            <!-- News Image -->
            <img 
              v-if="newsItem.imageUrl" 
              :src="newsItem.imageUrl" 
              :alt="newsItem.title"
              class="w-full h-64 object-cover rounded-lg mb-4"
            />
            
            <!-- Full Content -->
            <div class="text-gray-700 mb-6 leading-relaxed">
              <p>{{ newsItem.content }}</p>
            </div>
            
            <!-- Reporter and Date Info -->
            <div class="flex justify-between items-center text-sm text-gray-600 border-t pt-4">
              <span><strong>Reporter:</strong> {{ newsItem.reporter }}</span>
              <time :datetime="newsItem.reportedAt">
                {{ formatDate(newsItem.reportedAt) }}
              </time>
            </div>
          </div>

          <!-- Current Status Section -->
          <div class="flex-shrink-0 text-center">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Current Status</h2>
            <div class="flex flex-col items-center">
              <!-- Status Badge -->
              <div class="w-32 h-32 rounded-full flex items-center justify-center mb-4 border-4"
                   :class="currentStatusClass">
                <span class="text-2xl font-bold">{{ currentStatusText }}</span>
              </div>
              <p class="text-sm text-gray-600 text-center max-w-32">
                Based on {{ totalVotes }} vote{{ totalVotes !== 1 ? 's' : '' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Voting and Comments -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Voting Section -->
        <div class="bg-white/95 rounded-2xl p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Vote on this News</h2>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <!-- Fact Vote -->
            <div class="text-center">
              <div class="w-24 h-24 rounded-full flex items-center justify-center mb-4 mx-auto border-4 bg-green-100 border-green-300">
                <span class="text-lg font-bold text-green-700">FACT</span>
              </div>
              <p class="text-2xl font-bold text-green-700 mb-2">{{ currentVotes.notFake }}</p>
              <button 
                @click="vote('NOT_FAKE')"
                :disabled="hasVoted"
                class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ hasVoted ? 'Voted' : 'Vote' }}
              </button>
            </div>

            <!-- Fake Vote -->
            <div class="text-center">
              <div class="w-24 h-24 rounded-full flex items-center justify-center mb-4 mx-auto border-4 bg-red-100 border-red-300">
                <span class="text-lg font-bold text-red-700">FAKE</span>
              </div>
              <p class="text-2xl font-bold text-red-700 mb-2">{{ currentVotes.fake }}</p>
              <button 
                @click="vote('FAKE')"
                :disabled="hasVoted"
                class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ hasVoted ? 'Voted' : 'Vote' }}
              </button>
            </div>
          </div>

          <div v-if="hasVoted" class="text-center text-sm text-gray-600 bg-gray-100 rounded-lg p-3">
            <p>✓ Thank you for voting!</p>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="bg-white/95 rounded-2xl p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">Comments</h2>
            <button 
              @click="showAddComment = !showAddComment"
              class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              {{ showAddComment ? 'Cancel' : 'Add Comment' }}
            </button>
          </div>

          <!-- Add Comment Form -->
          <div v-if="showAddComment" class="mb-6 p-4 bg-gray-50 rounded-lg">
            <textarea
              v-model="newComment.text"
              placeholder="Share your thoughts about this news..."
              class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows="3"
            ></textarea>
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">Image URL (optional):</label>
              <input
                v-model="newComment.imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div class="mt-3 flex gap-2">
              <button 
                @click="addComment"
                :disabled="!newComment.text.trim()"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post Comment
              </button>
              <button 
                @click="cancelComment"
                class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Comments List -->
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div v-if="comments.length === 0" class="text-center text-gray-500 py-8">
              <p>No comments yet. Be the first to comment!</p>
            </div>

            <div v-for="comment in comments" :key="comment.id" class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-bold">{{ comment.user[0].toUpperCase() }}</span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="font-medium text-gray-900">{{ comment.user }}</span>
                    <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <p class="text-gray-700 text-sm leading-relaxed">{{ comment.text }}</p>
                  
                  <!-- Comment Image -->
                  <div v-if="comment.imageUrl" class="mt-3">
                    <img 
                      :src="comment.imageUrl" 
                      :alt="'Image by ' + comment.user"
                      class="max-w-full h-auto max-h-48 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      @click="openImageModal(comment.imageUrl)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="mt-8 text-center">
        <router-link 
          to="/" 
          class="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          ← Back to All News
        </router-link>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="modalImage" @click="closeImageModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="relative max-w-4xl max-h-full">
        <img :src="modalImage" alt="Enlarged view" class="max-w-full max-h-full object-contain rounded-lg" />
        <button 
          @click="closeImageModal"
          class="absolute top-4 right-4 bg-white text-gray-900 rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '../stores/news'

type Status = 'FAKE' | 'NOT_FAKE' | null

interface Props {
  id: string
}

const props = defineProps<Props>()
const route = useRoute()
const newsStore = useNewsStore()

// Reactive data - only UI state, business logic in Pinia
const showAddComment = ref(false)
const modalImage = ref<string | null>(null)
const newComment = ref({
  text: '',
  imageUrl: ''
})

// Get news ID
const newsId = computed(() => props.id || route.params.id as string)

// Computed properties using Pinia getters
const newsItem = computed(() => newsStore.getNewsById(newsId.value))
const currentVotes = computed(() => newsStore.getVoteCounts(newsId.value))
const hasVoted = computed(() => newsStore.hasUserVoted(newsId.value))
const comments = computed(() => newsStore.getComments(newsId.value))

const totalVotes = computed(() => currentVotes.value.fake + currentVotes.value.notFake)

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

// Methods using Pinia actions
function vote(voteType: Status) {
  if (!voteType || !newsId.value) return
  
  const success = newsStore.voteOnNews(newsId.value, voteType)
  if (!success) {
    console.warn('Vote failed - user may have already voted')
  }
}

function addComment() {
  if (!newComment.value.text.trim() || !newsId.value) return
  
  newsStore.addComment(newsId.value, {
    text: newComment.value.text.trim(),
    imageUrl: newComment.value.imageUrl.trim()
  })
  
  // Reset form
  cancelComment()
}

function cancelComment() {
  newComment.value = { text: '', imageUrl: '' }
  showAddComment.value = false
}

function openImageModal(imageUrl: string) {
  modalImage.value = imageUrl
}

function closeImageModal() {
  modalImage.value = null
}

function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('en-US', { 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  })
}

// Lifecycle
onMounted(() => {
  // Initialize comments for this news item
  if (newsId.value) {
    newsStore.initializeComments(newsId.value)
  }
})
</script>

<style scoped>
/* Custom scrollbar for comments */
.space-y-4::-webkit-scrollbar {
  width: 6px;
}

.space-y-4::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.space-y-4::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.space-y-4::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>