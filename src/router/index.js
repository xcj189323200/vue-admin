import Vue from "vue";
import Router from "vue-router";
import Home from "../views/home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/home",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login",
            meta: { isSide: true },
            // component: () => import(/* webpackChunkName: "login" */ "../views/Login/index.vue"),
        },
        {
            path: "*", //其他页面，强制跳转到登录页面
            name: "*",
            redirect: "/home"
          },
    ],
});
