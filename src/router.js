import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const routes = [
  {
    path: "/home",
    name: "home",
    // 同步加载组件
    component: Home,
    title: "Home"
  },
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
    path: "/menu",
    name: "menu",
    // route level code-splitting
    // this generates a separate chunk (menu.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 异步加载组件
    component: () => import(/* webpackChunkName: "menu" */ "./views/menu.vue"),
    title: "首页"
  },
  {
    path: '',
    component: () => import('@/components/menu/menu'),
    title: "菜单"
  }
]

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
})

export { routes }
