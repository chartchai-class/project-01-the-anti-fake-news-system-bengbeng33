import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [],
    comments: []
  }),
  
  actions: {
    // Add your actions here
  }
})