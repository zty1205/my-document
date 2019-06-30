import Vue from "vue";
import Router from "vue-router";
import vueDeepLearning from "./route/vue-learning/index"

Vue.use(Router);

const routes = [
  ...vueDeepLearning,
  {
    path: '',
    // route level code-splitting
    // this generates a separate chunk (Index.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 异步加载组件
    component: () => import(/* webpackChunkName: "Index" */ "./views/Index.vue"),
    title: "首页"
  },
  {
    path: '/temp',
    // route level code-splitting
    // this generates a separate chunk (Index.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 异步加载组件
    component: () => import(/* webpackChunkName: "Index" */ "./views/Temp.vue"),
    title: "临时"
  }
]

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
})

export { routes }
