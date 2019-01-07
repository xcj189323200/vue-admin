/**
 * 订单接口
 */


export default {
    /**
     * @description 获取商户列表
     * @date 2018-11-02
     * @param {*} data
     * @returns *
     */
    getAllBusinessList(params){
        return this.get({
            url: this.API_HOST + `sys/wallets/getAll`,
            params
        })
    },
    /**
     * @description 更改订单状态 put
     * @returns *
     */
    ChangeBusinessStatus(id, tdata){
        return this.putParam({
            url: this.API_HOST + `sys/wallets/update/${id}`,params:tdata
        });
    },

}

