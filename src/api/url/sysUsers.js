/**
 * 供货商接口
 */
export default {
    /**
     * @description 获取用户列表
     * @date 2018-11-02
     * @param {*} data
     * @returns *
     */
    getAllUsers(params) {
        return this.get({
            url: this.API_HOST + `users`,
            params,
        });
    },
    /**
     * @description 获取用户详情
     * @date 2018-11-02
     * @param {*} data
     * @returns *
     */
    getUsers(params) {
        return this.get({
            url: this.API_HOST + `users/${params.id}`,
        });
    },
    /**
     * @description 创建用户
     * @date 2018-11-02
     * @param {*} data
     * @returns *
     */
    createUser(data) {
        return this.post({
            url: this.API_HOST + `users`,
            data: { UserDTO: data },
        });
    },
    /**
     * @description 编辑用户
     * @date 2018-11-02
     * @param {*} data
     * @returns *
     */
    updateUser(data) {
        return this.put({
            url: this.API_HOST + `users`,
            data: { UserDTO: data },
        });
    },
};
