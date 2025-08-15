<template>
    <section class="w-full bg-black/95 rounded-2xl p-3 sm:p-4 lg:p-6">

        <div
            class="grid grid-cols-2 md:grid-cols-3 gap-x-32 gap-y-12 mx-auto max-w-[684px] md:max-w-[1038px] justify-items-center">
            <article v-for="n in items" :key="n.id" class="rounded-2xl bg-white overflow-hidden"
                :style="{ height: '290px', width: '330px' }">
                <img :src="n.imageUrl" alt="" class="h-24 w-full object-cover" />

                <div class="p-3 flex flex-col h-[calc(100%-6rem)] justify-between">
                    <!-- Title center -->
                    <div class="flex flex-col items-center">
                        <h3 class="text-sm font-semibold line-clamp-1 text-center w-full">
                            {{ n.title }}
                        </h3>

                        <div class="w-full flex justify-end mt-1">
                            <span class="text-[11px] text-gray-500 truncate text-right">{{ "by " + n.reporter }}</span>
                        </div>
                    </div>

                    <!-- Summary (optional: keep or move as needed) -->
                    <p class="text-xs text-gray-600 line-clamp-2 mt-1">
                        {{ n.summary }}
                    </p>

                    <!-- reportedAt left-bottom + badge right -->
                    <div class="flex flex-col flex-1 justify-between mt-2">
                        <div class="flex justify-between items-end mt-auto">
                            <time :datetime="n.reportedAt" class="text-[11px] text-gray-500">
                                {{ formatDate(n.reportedAt) }}
                            </time>
                            <span class="text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ml-auto"
                                :class="badgeClass(n.status)">
                                {{ badgeText(n.status) }}
                            </span>
                        </div>
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

// Define props to accept items from parent components
const props = defineProps<{
    items: NewsItem[]
}>()

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

<style scoped></style>
