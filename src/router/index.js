import Vue from "vue";
import Router from "vue-router";
import Classify from "./classify";
import Brand from "./brand";
import Grocer from "./grocer";
import CloudStore from "./cloudStore";
import Business from "./business";
import User from "./user";
import Order from "./order";
import Home from "../views/home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        ...Classify,
        ...Brand,
        ...Grocer,
        ...CloudStore,
        ...User,
        ...Order,
        ...Business,
        {
            path: "/home",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login",
            meta: { isSide: true },
            component: () => import(/* webpackChunkName: "login" */ "../views/Login/index.vue"),
        },
        {
            path: "*", //其他页面，强制跳转到登录页面
            name: "*",
            redirect: "/home"
          },
    ],
});
