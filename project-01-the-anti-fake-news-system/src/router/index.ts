import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewsDetailView from "../views/NewsDetailView.vue";
import VoteView from "../views/VoteView.vue";
import CommentsView from "../views/CommentsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/news/:id",
      name: "news-detail",
      component: NewsDetailView,
      props: true,
    },
    {
      path: "/news/:id/vote",
      name: "vote",
      component: VoteView,
      props: true,
    },
    {
      path: "/news/:id/comments",
      name: "comments",
      component: CommentsView,
      props: true,
    },
  ],
});

export default router;
