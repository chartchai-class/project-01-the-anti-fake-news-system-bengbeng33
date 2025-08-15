<template>
    <section class="w-full bg-black/95 rounded-2xl p-3 sm:p-4 lg:p-6">
        <div
            class="grid grid-cols-2 md:grid-cols-3 gap-x-32 gap-y-12 mx-auto max-w-[684px] md:max-w-[1038px] justify-items-center">
            <article
                v-for="n in items"
                :key="n.id"
                class="rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-[#cecece] h-[290px] w-[330px]"
                @click="goToNewsDetail(n.id)"
            >
                <div
                    class="relative px-4 pt-3 pb-2 rounded-t-2xl bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.15)] border-b-[3px]"
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

                <div class="p-3 flex flex-col justify-between h-14 pb-12">
                    <p class="text-[18px] text-gray-600 line-clamp mt-1">
                        {{ n.content }}
                    </p>
                </div>

                <!-- reportedAt left-bottom -->
                <div class="flex flex-1 flex-col justify-end mt-20 px-4">
                    <div class="flex justify-between items-end mt-auto">
                        <time :datetime="n.reportedAt" class="text-[px] text-gray-500">
                            {{ formatDate(n.reportedAt) }}
                        </time>
                    </div>
                </div>

                <div class="flex flex-col justify-between pb-6 relative">
                    <!-- Status image overlay -->
                    <img
                        :src="getStatusImage(n.status)"
                        alt="status"
                        class="absolute right-1 bottom-3 object-contain z-10 w-[120px] h-[120px] max-w-full"
                    />
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
    return '/Equal2.png'
}

function formatDate(iso: string) {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}
</script>

<style scoped></style>