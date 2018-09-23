import Vue from "vue";
import elementUI from 'element-ui'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'element-ui/lib/theme-chalk/index.css'
import "./styles/common.scss"

Vue.config.productionTip = false;
Vue.use(elementUI, {
  size: 'small'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
