import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  routes: (_routes) => [
    ..._routes,
    {
      name: "home",
      path: "/",
      component: () => import("~/pages/home/index.vue"),
    },
  ],
};
