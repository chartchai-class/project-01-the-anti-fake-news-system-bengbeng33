<template>
    <section class="w-full rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6">
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-8 md:gap-x-12 lg:gap-x-8 xl:gap-x-12 gap-y-8 sm:gap-y-10 md:gap-y-12 lg:gap-y-12 xl:gap-y-16 mx-auto max-w-[330px] sm:max-w-[700px] md:max-w-[750px] lg:max-w-[1100px] xl:max-w-[1200px] justify-items-center">
            <article
                v-for="n in items"
                :key="n.id"
                class="rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-[#cecece] h-[280px] sm:h-[280px] md:h-[300px] lg:h-[300px] xl:h-[320px] w-[330px] sm:w-[320px] md:w-[340px] lg:w-[340px] xl:w-[360px]"
                @click="goToNewsDetail(n.id)"
            >
                <div
                    class="relative px-3 sm:px-3 md:px-4 lg:px-4 pt-3 pb-2 rounded-t-2xl bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.15)] border-b-[3px] h-[90px] sm:h-[90px] md:h-[100px] lg:h-[110px] flex flex-col justify-center"
                >
                    <!-- Title center -->
                    <div class="flex flex-col items-center bl">
                        <h3 class="text-[18px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold line-clamp text-center w-full">
                            {{ n.title }}
                        </h3>
                        <div class="w-full flex justify-end mt-1">
                            <span class="text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-gray truncate text-right">
                                {{ "by " + n.reporter }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="relative p-3 pb-24 sm:pb-24 md:pb-26 lg:pb-28 flex flex-col justify-between flex-1 select-none">
                    <p class="text-[16px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-600 line-clamp-2 mt-1 overflow-hidden leading-relaxed flex-1">
                        {{ n.content }}
                    </p>
                    
                    <!-- Bottom row with date and status image - absolutely positioned -->
                    <div class="absolute bottom-0 left-3 right-3 flex justify-between items-end">
                        <time :datetime="n.reportedAt" class="text-[12px] sm:text-[12px] md:text-[13px] lg:text-[14px] text-gray-500 pb-1">
                            {{ formatDate(n.reportedAt) }}
                        </time>
                        
                        <!-- Status image -->
                        <img
                            :src="getStatusImage(n.currentStatus || n.status)"
                            alt="status"
                            class="w-[100px] h-[100px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[120px] object-contain"
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
    currentStatus?: Status
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