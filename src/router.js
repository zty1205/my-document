import Vue from "vue";
import Router from "vue-router";
import vueDeepLearning from "./route/vue-learning/index";
import leetCode from './route/leetCode'
import demo from "./route/demo";
import test from "./route/test";

Vue.use(Router);

const routes = [
  ...vueDeepLearning,
  ...leetCode,
  ...demo,
  ...test,
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
  }
];

export default new Router({
  base: process.env.BASE_URL,
  routes: routes
});

export { routes };
