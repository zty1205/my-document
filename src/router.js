import Vue from "vue";
import Router from "vue-router";
import vueDeepLearning from "./route/vue-learning/index"

Vue.use(Router);

const routes = [
  ...vueDeepLearning,
  {
    path: "/demo",
    name: "demo",
    component: () => import("./components/demo/FileReader.vue"),
    title: "FileReader示例"
  },
  {
    path: "/imgDemo",
    name: "imgDemo",
    component: () => import("./components/demo/uploadImg.vue"),
    title: "图片上传示例"
  },
  {
    path: '/slotParent',
    component: () => import('@/components/demo/slotParent'),
    title: 'slot示例'
  },
  {
    path: '/dateMCheck',
    component: () => import('@/components/demo/dateMCheck'),
    title: '自定义日期多选'
  },
  {
    path: '',
    // route level code-splitting
    // this generates a separate chunk (Index.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 异步加载组件
    component: () => import(/* webpackChunkName: "Index" */ "./views/Index.vue"),
    title: "首页"
  }
]

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
})

export { routes }
