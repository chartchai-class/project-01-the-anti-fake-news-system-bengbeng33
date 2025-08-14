import { defineStore } from "pinia";
import newsData from "@/data/db.json";

export const useNewsStore = defineStore("news", {
  state: () => ({
    // Mock data from db.json
    mockNews: newsData.news,
    mockComments: newsData.comments,

    // Temporary data (cleared on refresh)
    temporaryComments: [],
    temporaryVotes: [],

    // UI state
    currentFilter: "all", // all, real, fake
    currentPage: 1,
    itemsPerPage: 5,
    loading: false,
  }),

  getters: {
    // Get filtered news based on current filter
    filteredNews: (state) => {
      if (state.currentFilter === "all") {
        return state.mockNews;
      }
      return state.mockNews.filter(
        (news) => news.status === state.currentFilter,
      );
    },

    // Get paginated news
    paginatedNews: (state) => {
      const filtered = state.filteredNews;
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return filtered.slice(start, end);
    },

    // Get total pages
    totalPages: (state) => {
      return Math.ceil(state.filteredNews.length / state.itemsPerPage);
    },

    // Get news by ID
    getNewsById: (state) => {
      return (id) => state.mockNews.find((news) => news.id === parseInt(id));
    },

    // Get all comments for a news item (mock + temporary)
    getCommentsByNewsId: (state) => {
      return (newsId) => {
        const mockComments = state.mockComments.filter(
          (comment) => comment.newsId === parseInt(newsId),
        );
        const tempComments = state.temporaryComments.filter(
          (comment) => comment.newsId === parseInt(newsId),
        );
        return [...mockComments, ...tempComments].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
      };
    },
  },

  actions: {
    // Filter actions
    setFilter(filter) {
      this.currentFilter = filter;
      this.currentPage = 1; // Reset to first page when filtering
    },

    // Pagination actions
    setPage(page) {
      this.currentPage = page;
    },

    setItemsPerPage(items) {
      this.itemsPerPage = items;
      this.currentPage = 1; // Reset to first page when changing items per page
    },

    // Add temporary comment (will disappear on refresh)
    addComment(newsId, author, comment, vote, imageUrl = "") {
      const newComment = {
        id: Date.now(), // Simple ID generation
        newsId: parseInt(newsId),
        author,
        comment,
        vote,
        timestamp: new Date().toISOString(),
        imageUrl,
      };
      this.temporaryComments.push(newComment);
    },

    // Add temporary vote (will disappear on refresh)
    addVote(newsId, vote) {
      const newVote = {
        id: Date.now(),
        newsId: parseInt(newsId),
        vote,
        timestamp: new Date().toISOString(),
      };
      this.temporaryVotes.push(newVote);

      // Update vote count in UI (temporary)
      const news = this.mockNews.find((n) => n.id === parseInt(newsId));
      if (news) {
        if (vote === "real") {
          news.voteCount.real++;
        } else {
          news.voteCount.fake++;
        }
      }
    },

    // Loading state
    setLoading(status) {
      this.loading = status;
    },
  },
});
