/**
 * 订单接口
 */


export default {
    /**
     * @description 获取微商城订单列表
     * @date 2018-11-02
     * @param {*} data
     * @returns *
     */
    getWeiOrderList(params){
        return this.get({
            url: this.API_HOST + `sys/order/orderList`,
            params
        })
    },
    /**
     * @description 获取微商城订单详情
     * @date 2018-11-02
     * @param {*} orderId 订单id
     * @returns *
     */
    getWorderDetail(params){
        return this.get({
            url: this.API_HOST + `sys/order/orderDetail/`+params.orderId,
        })
    },
    /**
     * @description 订单更改物流信息
     * @date 2018-11-02
     * @param {Number} expressId
     * @param {String} expressNum
     * @param {Number} orderId
     * @returns *
     */
    saveOrderLogistics(data){
        return this.post({
            url: this.API_HOST + `sys/order/saveOrderLogistics`,
            data
        })
    },
    /**
     * @description 查看订单物流
     * @date 2018-11-02
     * @param {*} orderId 订单id
     * @returns *
     */
    orderDeliveryDetail(params){
        return this.get({
            url: this.API_HOST + `sys/order/getLogistics/`+params.orderId,
        })
    },
    /**
     * @description 查询订单统计信息
     * @date 2018-11-02
     * @param {*} orderId 订单id
     * @returns *
     */
    getAllObserverData(params){
        return this.get({
            url: this.API_HOST + `orderStatisticses/search`,
            params
        })
    },
    /**
     * @description 查看订单汇总信息
     * @date 2018-11-02
     * @param {*} orderId 订单id
     * @returns *
     */
    getSumObserverData(params){
        return this.get({
            url: this.API_HOST + `orderStatisticses/summary`,
            params
        })
    },
    /**
     * @description 导出订单信息
     * @date 2018-11-02
     * @param {*} orderId 订单id
     * @returns *
     */
    orderExport(params){
        return this.get({
            url: this.API_HOST + `sys/order/orderExport`,
            params,
            responseType:'blob'
        })
    },
    /**
     * @description 导出订单信息
     * @date 2018-11-02
     * @param {*} orderId 订单id
     * @returns *
     */
    getorderExport(params){
        return this.get({
            url: this.API_HOST + `orderStatisticses/export`,
            params,
            responseType:'blob'
        })
    },
}

