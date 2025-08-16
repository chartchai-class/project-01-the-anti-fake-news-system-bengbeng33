<template>
  <div class="min-h-screen ">
    <div class="flex justify-center">
      <div class="relative inline-block -mt-2 mb-6">
        <img
          src="/H.png"
          alt="Daybreak banner"
          class="w-[520px] max-w-full h-auto pointer-events-none select-none"
        />
        <h1 class="absolute inset-0 grid place-items-center z-10 pointer-events-none">
          <span class="px-4 py-1 rounded-xl text-black text-3xl sm:text-4xl font-bold tracking-wide backdrop-blur-[1px]">
            Vote
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
        <p class="text-gray-300 text-sm">Vote on this news article</p>
      </div>

      <!-- Voting Card -->
      <div class="bg-white/95 rounded-2xl p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left Side - Fact Vote -->
          <div class="flex flex-col items-center">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Score: {{ voteCounts.notFake }}</h3>
            <div class="w-48 h-48 rounded-full flex items-center justify-center mb-6 border-4 bg-green-100 border-green-300">
              <span class="text-3xl font-extrabold tracking-wide text-green-700">FACT</span>
            </div>
            <button
              @click="vote('NOT_FAKE')"
              :disabled="hasVoted"
              class="px-8 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              vote
            </button>
          </div>

          <!-- Right Side - Fake Vote -->
          <div class="flex flex-col items-center">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Score: {{ voteCounts.fake }}</h3>
            <div class="w-48 h-48 rounded-full flex items-center justify-center mb-6 border-4 bg-red-100 border-red-300">
              <span class="text-3xl font-extrabold tracking-wide text-red-700">FAKE</span>
            </div>
            <button
              @click="vote('FAKE')"
              :disabled="hasVoted"
              class="px-8 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              vote
            </button>
          </div>
        </div>

        <!-- Vote Status Message -->
        <div v-if="hasVoted" class="mt-8 text-center">
          <p class="text-green-600 font-medium">Thank you for voting!</p>
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '../stores/news'

interface Props {
  id: string
}

const props = defineProps<Props>()
const route = useRoute()
const newsStore = useNewsStore()

// Get news ID
const newsId = computed(() => props.id || route.params.id as string)

// Computed properties using Pinia getters
const newsItem = computed(() => newsStore.getNewsById(newsId.value))
const voteCounts = computed(() => newsStore.getVoteCounts(newsId.value))
const hasVoted = computed(() => newsStore.hasUserVoted(newsId.value))

// Vote function
function vote(voteType: 'FAKE' | 'NOT_FAKE') {
  if (newsStore.voteOnNews(newsId.value, voteType)) {
    // Vote was successful
    console.log(`Voted ${voteType} on news ${newsId.value}`)
  }
}
</script>