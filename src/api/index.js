/**
 * Created by Cray on 2017/1/5.
 */
import { API_HOST, MOCK_API_HOST, ADMIN_HOST, HOST } from "./config";
// import Local from "@utils/local";
import axios from "./axios";
import Utils from "@utils/utils";

import sysUsersApi from "./url/sysUsers"; // 用户接口
import sysLogin from "./url/sysLogin"; // 登录
import sysCategroyApi from "./url/sysCategroy"; // 用户接口
import sysOrderApi from "./url/sysOrder"; // 订单接口
import sysStoreApi from "./url/sysStore"; // 用户接口
import sysBrandApi from "./url/sysBrand"; // 品牌接口
import sysSupplierApi from "./url/sysSupplier"; // 供货商接口
import sysBusinessApi from "./url/sysBusiness"; // 供货商接口
import syeNewMannersApi from "./url/sysNewManners"; // 新人礼接口
import syeHotDailyApi from "./url/sysHotDaily"; // 每日爆款接口
import sysProductApi from "./url/sysProduct"; // 云商品库接口
import sysCloudStore from "./url/sysCloudStore"; // 云仓接口

export default Object.assign(
    {},
    {
        ADMIN_HOST,
        API_HOST,
        MOCK_API_HOST,
        HOST,
    },
    sysUsersApi,
    sysCategroyApi,
    sysOrderApi,
    sysLogin,
    sysStoreApi,
    sysBrandApi,
    sysSupplierApi,
    sysBusinessApi,
    syeNewMannersApi,
    syeHotDailyApi,
    sysProductApi,
    sysCloudStore,
    {
        // 菜单接口 /api/sys/menu/menuList
        menuList(params) {
            return this.get({
                url: this.API_HOST + `sys/menu/menuList`,
                params,
            });
        },
    },
    {
        put({ url, headers = this.getHeaders(), data = {} }) {
            return axios({ method: "put", url, headers, data, timeout: 15000 });
        },
        putParam({ url, headers = this.getHeaders(), params = {} }) {
            return axios({ method: "put", url, headers, params, timeout: 15000 });
        },
        post({ url, headers = this.getHeaders(), data = {} }) {
            return axios({ method: "post", url, headers, data, timeout: 15000 });
        },
        get({ url, headers = this.getHeaders(), params = {}, responseType = "json" }) {
            return axios({ method: "get", url, headers, params, responseType, timeout: 15000 });
        },
        delete({ url, headers = this.getHeaders(), params = {} }) {
            return axios({ method: "delete", url, headers, params, timeout: 15000 });
        },
        getHeaders() {
            const { _DJ_TOKEN } = Utils.getCookie();
            let headers = {
                "Content-Type": "application/json;charset=UTF-8",
            };
            if (_DJ_TOKEN) {
                headers.token = _DJ_TOKEN;
            }
            return headers;
        },
    }
    // {
    //     axios(url, data = {}, {
    //         method = 'get',
    //         headers = this.getHeader(),
    //         timeout = 15000
    //     } = {}) {
    //         data = this.paramFormat(data)
    //         let params = method == 'get' ? {params: data} : {data}
    //         return axios({
    //             method,
    //             url,
    //             headers,
    //             timeout,
    //             ...params,
    //         })
    //     },
    // },
);
