/**
 * 登录接口
 */
export default {
    /**
     * @description 登录
     * @date 2018-11-20
     * @param {*} data
     * @returns *
     */
    LoginUser(data) {
        return this.post({
            url: this.API_HOST + `user/authenticate`,
            data: data,
        });
    }
};
