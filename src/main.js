import Vue from "vue";
import elementUI from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/common.scss";
import "zty-comp/lib/ztyComp.css";
import ztyComp from "zty-comp";
console.log("zty-comp = ", ztyComp);
Vue.use(ztyComp);

Vue.config.productionTip = false;
// try ctach 主 然后function.call
Vue.config.errorHandler = (err, vm, info) => {
  console.log("err = ", err);
  console.log("vm = ", vm);
  console.log("info = ", info);
};
Vue.use(elementUI, {
  size: "small"
});

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
