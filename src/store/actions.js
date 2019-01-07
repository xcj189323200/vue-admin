/*
 * @Author: 徐长剑
 * @Description: vuex 定义action文件
 * @Date: 2018-08-27 13:49:09
 * @Last Modified time: 2018-08-27 13:49:09
 */

// import MutationsType from "./type";
import Api from "@api";

export default {
    /*
    * @Description: 退出登录
    */
    loginOut: () => {
        // console.log(`${Api.ADMIN_HOST}/passport/login.do?redirectURL=${Api.HOST}`,'`${Api.ADMIN_HOST}?redirectURL=${Api.HOST}`');
        document.cookie = "_DJ_TOKEN=; expires=Mon, 11 Nov 1990 00:00:00 GMT; domain=.17dianjia.net;path=/";
        window.location.href = `${Api.ADMIN_HOST}/passport/login.do?redirectURL=${window.location.href}`;
        // window.location.href = `${Api.ADMIN_HOST}/passport/login.do?redirectURL=${Api.HOST}`;
    },
};
