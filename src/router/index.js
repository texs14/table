import { createRouter, createWebHistory } from "vue-router";
import VExample3 from "@/pages/HomePage";

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: VExample3 }],
});

export default router;
