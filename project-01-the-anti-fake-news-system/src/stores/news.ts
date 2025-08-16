import { defineStore } from 'pinia'
import data from '../data/db.json'

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

interface Comment {
  id: number
  user: string
  text: string
  imageUrl?: string
  createdAt: string
}

interface CommentData {
  text: string
  imageUrl?: string
  user?: string
}

interface NewNewsData {
  title: string
  content: string
  reporter: string
  imageUrl?: string
  status?: Status
}

interface NewNewsWithVotesData {
  title: string
  content: string
  reporter: string
  imageUrl?: string
  status?: Status
  initialVotes?: {
    fake: number
    notFake: number
  }
}

export const useNewsStore = defineStore('news', {
  state: () => ({
    // All news data from db.json + session added news
    allNews: [...data.news] as NewsItem[],
    
    // Session-based voting data (resets on app restart)
    sessionVotes: new Map<number, { fake: number; notFake: number }>(),
    userVotes: new Set<number>(),
    
    // Comments data (session-based)
    newsComments: new Map<number, Comment[]>(),
    
    // Session added news (temporary)
    sessionNews: [] as NewsItem[],
    
    // Next ID for new news items
    nextNewsId: Math.max(...data.news.map(n => n.id)) + 1,
    
    // Default mock comments for each news
    defaultComments: [
      {
        id: 1,
        user: 'John Doe',
        text: 'This seems like reliable information based on the sources provided.',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 2,
        user: 'Jane Smith',
        text: 'I have some doubts about this. The timing seems suspicious.',
        imageUrl: 'https://picsum.photos/id/200/400/300',
        createdAt: new Date(Date.now() - 43200000).toISOString()
      }
    ] as Comment[]
  }),

  getters: {
    // Get all news (original + session added)
    getAllNews: (state): NewsItem[] => {
      return [...state.allNews, ...state.sessionNews]
    },

    // Get news by ID
    getNewsById: (state) => (id: string | number): NewsItem | undefined => {
      const allNews = [...state.allNews, ...state.sessionNews]
      return allNews.find(news => news.id === parseInt(id.toString()))
    },

    // Get current vote counts for a news item
    getVoteCounts: (state) => (newsId: string | number): { fake: number; notFake: number } => {
      const id = parseInt(newsId.toString())
      const allNews = [...state.allNews, ...state.sessionNews]
      const originalNews = allNews.find(news => news.id === id)
      const sessionVote = state.sessionVotes.get(id)
      
      if (sessionVote) {
        return sessionVote
      }
      
      return originalNews ? originalNews.stats : { fake: 0, notFake: 0 }
    },

    // Check if user has voted on specific news
    hasUserVoted: (state) => (newsId: string | number): boolean => {
      return state.userVotes.has(parseInt(newsId.toString()))
    },

    // Get comments for specific news
    getComments: (state) => (newsId: string | number): Comment[] => {
      const id = parseInt(newsId.toString())
      if (state.newsComments.has(id)) {
        return state.newsComments.get(id) || []
      }
      return [...state.defaultComments] // Return copy of default comments
    },

    // Get current status based on vote counts
    getCurrentStatus: (state) => (newsId: string | number): Status => {
      const id = parseInt(newsId.toString())
      const voteCounts = state.sessionVotes.get(id)
      const allNews = [...state.allNews, ...state.sessionNews]
      const originalNews = allNews.find(news => news.id === id)
      
      if (voteCounts) {
        if (voteCounts.fake > voteCounts.notFake) return 'FAKE'
        if (voteCounts.notFake > voteCounts.fake) return 'NOT_FAKE'
      }
      
      return originalNews?.status || null
    },

    // Filter news by status
    getNewsByStatus: (state) => (status: string): NewsItem[] => {
      const allNews = [...state.allNews, ...state.sessionNews]
      if (status === 'all') return allNews
      return allNews.filter(news => news.status === status)
    },

    // Get news with updated vote counts
    getNewsWithCurrentVotes: (state) => (): NewsItem[] => {
      const allNews = [...state.allNews, ...state.sessionNews]
      return allNews.map(news => {
        const sessionVote = state.sessionVotes.get(news.id)
        return {
          ...news,
          stats: sessionVote || news.stats,
          currentStatus: sessionVote ? 
            (sessionVote.fake > sessionVote.notFake ? 'FAKE' : 
             sessionVote.notFake > sessionVote.fake ? 'NOT_FAKE' : news.status) 
            : news.status
        }
      })
    }
  },

  actions: {
    // Add new news item (session-based) - Original method
    addNews(newsData: NewNewsData): NewsItem {
      const newNewsItem: NewsItem = {
        id: this.nextNewsId++,
        title: newsData.title,
        summary: newsData.content.length > 100 ? newsData.content.substring(0, 100) + '...' : newsData.content,
        content: newsData.content,
        status: newsData.status || null,
        reporter: newsData.reporter,
        reportedAt: new Date().toISOString(),
        imageUrl: newsData.imageUrl || `https://picsum.photos/id/${Math.floor(Math.random() * 200) + 100}/800/400`,
        stats: { fake: 0, notFake: 0 }
      }

      this.sessionNews.unshift(newNewsItem) // Add to beginning of array
      return newNewsItem
    },

    // Add new news item with initial votes (session-based) - New method
    addNewsWithVotes(newsData: NewNewsWithVotesData): NewsItem {
      const newNewsItem: NewsItem = {
        id: this.nextNewsId++,
        title: newsData.title,
        summary: newsData.content.length > 100 ? newsData.content.substring(0, 100) + '...' : newsData.content,
        content: newsData.content,
        status: newsData.status || null,
        reporter: newsData.reporter,
        reportedAt: new Date().toISOString(),
        imageUrl: newsData.imageUrl || `https://picsum.photos/id/${Math.floor(Math.random() * 200) + 100}/800/400`,
        stats: {
          fake: newsData.initialVotes?.fake || 0,
          notFake: newsData.initialVotes?.notFake || 0
        }
      }

      this.sessionNews.unshift(newNewsItem) // Add to beginning of array
      return newNewsItem
    },

    // Vote on a news item
    voteOnNews(newsId: string | number, voteType: Status): boolean {
      const id = parseInt(newsId.toString())
      
      // Check if user already voted
      if (this.userVotes.has(id)) {
        console.warn('User has already voted on this news')
        return false
      }

      // Get current vote counts
      let currentVotes = this.sessionVotes.get(id)
      if (!currentVotes) {
        const allNews = [...this.allNews, ...this.sessionNews]
        const originalNews = allNews.find(news => news.id === id)
        currentVotes = originalNews ? { ...originalNews.stats } : { fake: 0, notFake: 0 }
      }

      // Update vote count
      if (voteType === 'FAKE') {
        currentVotes.fake++
      } else if (voteType === 'NOT_FAKE') {
        currentVotes.notFake++
      }

      // Save updated votes
      this.sessionVotes.set(id, currentVotes)
      this.userVotes.add(id)

      return true
    },

    // Add comment to news
    addComment(newsId: string | number, commentData: CommentData): Comment {
      const id = parseInt(newsId.toString())
      
      const newComment: Comment = {
        id: Date.now(),
        user: commentData.user || 'You',
        text: commentData.text,
        imageUrl: commentData.imageUrl || undefined,
        createdAt: new Date().toISOString()
      }

      // Get existing comments or start with default
      const comments = this.newsComments.get(id) || [...this.defaultComments]
      
      // Add new comment at the beginning
      comments.unshift(newComment)
      
      // Save back to store
      this.newsComments.set(id, comments)

      return newComment
    },

    // Reset all session data (for testing)
    resetSessionData(): void {
      this.sessionVotes.clear()
      this.userVotes.clear()
      this.newsComments.clear()
      this.sessionNews = []
      this.nextNewsId = Math.max(...data.news.map(n => n.id)) + 1
    },

    // Initialize comments for a news item if not exists
    initializeComments(newsId: string | number): void {
      const id = parseInt(newsId.toString())
      if (!this.newsComments.has(id)) {
        this.newsComments.set(id, [...this.defaultComments])
      }
    }
  }
})