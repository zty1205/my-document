export default [
  {
    path: '/vue/transition',
    component: () => import('@/components/vue-learning/transition.vue'),
    title: 'transition组件示例'
  },
  {
    path: '/vue/transition-group',
    component: () => import('@/components/vue-learning/transition-group.vue'),
    title: 'transition-group组件示例'
  }
]