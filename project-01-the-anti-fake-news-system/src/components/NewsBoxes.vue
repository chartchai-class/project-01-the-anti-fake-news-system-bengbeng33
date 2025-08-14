<template>
  <section class="w-full bg-black/95 rounded-2xl p-3 sm:p-4 lg:p-6">
    <div
      class="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-8 mx-auto max-w-[684px] md:max-w-[1038px] justify-items-center"
    >
      <article
        v-for="n in items"
        :key="n.id"
        class="rounded-2xl bg-white overflow-hidden"
        :style="{ height: '240px', width: '350px' }"
      >
        <img :src="n.imageUrl" alt="" class="h-24 w-full object-cover" />

        <div class="p-3">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-sm font-semibold line-clamp-1">
              {{ n.title }}
            </h3>

            <span
              class="text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap"
              :class="badgeClass(n.status)"
            >
              {{ badgeText(n.status) }}
            </span>
          </div>

          <p class="text-xs text-gray-600 line-clamp-2 mt-1">
            {{ n.summary }}
          </p>

          <div class="mt-2 text-[11px] text-gray-500 flex items-center gap-2">
            <span class="truncate">{{ n.reporter }}</span>
            <span aria-hidden="true">•</span>
            <time :datetime="n.reportedAt">
              {{ formatDate(n.reportedAt) }}
            </time>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type Status = 'FAKE' | 'NOT_FAKE' | null

interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  status: Status
  reporter: string
  reportedAt: string
  imageUrl: string
  stats: { fake: number; notFake: number }
}

import data from '@/data/db.json'
const items = (data as { news: NewsItem[] }).news

function badgeText(s: Status) {
  return s === 'FAKE' ? 'Fake' : s === 'NOT_FAKE' ? 'Fact' : 'Unverified'
}

function badgeClass(s: Status) {
  return s === 'FAKE'
    ? 'bg-red-100 text-red-700 border-red-300'
    : s === 'NOT_FAKE'
      ? 'bg-green-100 text-green-700 border-green-300'
      : 'bg-gray-100 text-gray-700 border-gray-300'
}

function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}
</script>

<style scoped>
</style>
