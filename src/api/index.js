/**
 * Created by Cray on 2017/1/5.
 */
import { API_HOST } from "./config";
// import Local from "@utils/local";
import axios from "./axios";
// import qs from "qs";

import sysUsersApi from "./url/sysUsers"; // 用户接口
import sysLogin from "./url/sysLogin" // 登录
import sysCategroyApi from "./url/sysCategroy"; // 用户接口
import sysOrderApi from "./url/sysOrder"; // 订单接口
import sysStoreApi from "./url/sysStore"; // 用户接口
import sysBrandApi from "./url/sysBrand"; // 品牌接口
import sysSupplier from "./url/sysSupplier"; // 供货商接口

export default Object.assign(
    {},
    {
        API_HOST,
    },
    sysUsersApi,
    sysCategroyApi,
    sysOrderApi,
    sysLogin,
    sysStoreApi,
    sysBrandApi,
    sysSupplier,
    {
        put({ url, headers = this.getHeaders(), data = {} }) {
            return axios({ method: "put", url, headers, data, timeout: 15000 });
        },
        post({ url, headers = this.getHeaders(), data = {} }) {
            return axios({ method: "post", url, headers, data, timeout: 15000 });
        },
        get({ url, headers = this.getHeaders(), params = {},responseType="json" }) {
            return axios({ method: "get", url, headers, params,responseType, timeout: 15000 });
        },
        delete({ url, headers = this.getHeaders(), params = {} }) {
            return axios({ method: "delete", url, headers, params, timeout: 15000 });
        },
        getHeaders() {
            const token = localStorage.getItem("token");
            let headers = {
                "Content-Type": "application/json;charset=UTF-8",
            }
            if (token) {
                headers.Authorization = token
            }
            return headers;
        },
    },
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
