/**
 * Created by VULCAN on 2018/8/8.
 */
import axios from "axios";

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    res => {
        let _data = null;
        if (res.status === 200) {
            _data = res.data;
        }
        return _data;
    },
    err => {
        switch (err.response.status) {
            case 400:
                // message.error(err.response.data.message);
                break;
            case 401:
            {
                let _messages = ''
                if(err.response.data.title === 'Unauthorized'){
                    _messages = '登录失效, 请重新登录'
                } else {
                    _messages = err.response.data.message ? err.response.data.message : "登录失效, 请重新登录";
                }
                window._Vue.$message.error(_messages);
                window._Vue.$router.push({ name: "login" });
                break;}
            case 405:
            case 500:
            default:
                if (err.response.data && err.response.data.message) {
                    window._Vue.$message.error(err.response.data.message);
                } else {
                    window._Vue.$message.error("服务器错误");
                }
                break;
        }
        return err.response;
    }
);

export default axios;
