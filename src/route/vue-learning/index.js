import directive from "./directive";
import keepAlive from "./keep-alive";
import transition from "./transition";
import isComponents from "./isComponts";
import store from "./store";

export default [
  ...directive,
  ...keepAlive,
  ...transition,
  ...isComponents,
  ...store,
  {
    path: "/vue/life-style",
    component: () => import("@/components/vue-learning/life-style.vue"),
    title: "vue生命周期",
    name: "life-style"
  },
  {
    path: "/vue/provide-inject",
    component: () => import("@/components/vue-learning/provider.vue"),
    title: "vue依赖注入provide-inject",
    name: "provide-inject"
  },
  {
    path: "/vue/msg",
    component: () => import("@/components/vue-learning/v_parent.vue"),
    title: "vue通信方式$attr",
    name: "msg-attr"
  }
];
