import Vue from "vue";
import elementUI from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/common.scss";

Vue.config.productionTip = false;
Vue.use(elementUI, {
  size: "small"
});

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
