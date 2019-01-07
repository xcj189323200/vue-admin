import Vue from "vue";
import App from "./App.vue";
import router from "@router/index";
import store from "@store/index";
import filters from "./filters/index";
import api from "@api/index";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@css/main.scss";
var fundebug = require("fundebug-javascript");
fundebug.apikey = "445aee9a72de82ad5266f267be15e71d75e16f1b9f1e6ad493c4d5acedf73ddf";

Vue.config.productionTip = false;
Vue.prototype.$http = api;
Vue.use(ElementUI);

if(process.env.VUE_APP_ENV === 'production'){
    Vue.config.errorHandler = function(err, vm, info) {
        if (vm) {
            if (vm.$root === vm) return "root";
            var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
            var componentName = (name ? "component <" + name + ">" : "anonymous component") + (vm._isVue && vm.$options && vm.$options.__file ? " at " + (vm.$options && vm.$options.__file) : "");
            var propsData = vm.$options && vm.$options.propsData;
            fundebug.notifyError(err, {
                metaData: {
                    componentName: componentName,
                    propsData: propsData,
                    info: info,
                },
            });
        } else {
            fundebug.notifyError(err);
        }
    };
}

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

router.beforeEach((to, from, next) => {
    let { isLogin } = store.getters;
    if (isLogin) {
        next();
    } else {
        next();
        // store.dispatch('loginOut')
    }
});

window._Vue = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
