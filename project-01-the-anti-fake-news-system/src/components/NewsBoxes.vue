<template>
    <section class="w-full rounded-2xl p-3 sm:p-4 lg:p-6">
        <div
            class="grid grid-cols-2 md:grid-cols-3 gap-x-32 gap-y-12 mx-auto max-w-[684px] md:max-w-[1038px] justify-items-center">
            <article
                v-for="n in items"
                :key="n.id"
                class="rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-[#cecece] h-[290px] w-[330px]"
                @click="goToNewsDetail(n.id)"
            >
                <div
                    class="relative px-4 pt-3 pb-2 rounded-t-2xl bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.15)] border-b-[3px] h-[100px] flex flex-col justify-center"
                >
                    <!-- Title center -->
                    <div class="flex flex-col items-center bl">
                        <h3 class="text-[22px] font-bold line-clamp text-center w-full">
                            {{ n.title }}
                        </h3>
                        <div class="w-full flex justify-end mt-1">
                            <span class="text-[16px] text-gray truncate text-right">
                                {{ "by " + n.reporter }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="relative p-3 pb-28 flex flex-col justify-between flex-1 select-none">
                    <p class="text-[18px] text-gray-600 line-clamp-2 mt-1 overflow-hidden leading-relaxed flex-1">
                        {{ n.content }}
                    </p>
                    
                    <!-- Bottom row with date and status image - absolutely positioned -->
                    <div class="absolute bottom-0 left-3 right-3 flex justify-between items-end">
                        <time :datetime="n.reportedAt" class="text-[14px] text-gray-500 pb-1">
                            {{ formatDate(n.reportedAt) }}
                        </time>
                        
                        <!-- Status image -->
                        <img
                            :src="getStatusImage(n.status)"
                            alt="status"
                            class="w-[120px] h-[120px] object-contain"
                        />
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'

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

// Define props without variable assignment
defineProps<{
    items: NewsItem[]
}>()

const router = useRouter()

function goToNewsDetail(newsId: number) {
    router.push(`/news/${newsId}`)
}

function getStatusImage(s: Status) {
    if (s === 'FAKE') return '/Fake.png'
    if (s === 'NOT_FAKE') return '/Fact.png'
    return '/Equal.png'
}

function formatDate(iso: string) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}
</script>

<style scoped></style>