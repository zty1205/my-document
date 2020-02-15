import Vue from "vue";
import Router from "vue-router";
import vueDeepLearning from "./route/vue-learning/index";
import demo from "./route/demo";

Vue.use(Router);

const routes = [
  ...vueDeepLearning,
  ...demo,
  {
    path: "",
    // route level code-splitting
    // this generates a separate chunk (Index.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 异步加载组件
    component: () =>
      import(/* webpackChunkName: "Index" */ "./views/Index.vue"),
    title: "首页"
  },
  {
    path: "/temp",
    // route level code-splitting
    // this generates a separate chunk (Index.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 异步加载组件
    component: () => import(/* webpackChunkName: "Index" */ "./views/Temp.vue"),
    title: "临时"
  },
  {
    path: "/use-zty-comp",
    component: () => import("./components/use-zty-comp.vue"),
    title: "npm组件库"
  }
];

export default new Router({
  base: process.env.BASE_URL,
  routes: routes
});

export { routes };
