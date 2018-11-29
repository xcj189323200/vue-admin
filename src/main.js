import Vue from "vue";
import App from "./App.vue";
import router from "@router/index";
import store from "@store/index";
import filters from "./filters/index";
import api from "@api/index";
import "./registerServiceWorker";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@css/main.scss"

Vue.config.productionTip = false;
Vue.prototype.$http = api
Vue.use(ElementUI);

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

window._Vue = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
