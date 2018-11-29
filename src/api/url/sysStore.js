/**
 * 门店接口
 */

export default {
     /**
     * @description 获取门店列表
     * @date 2018-11-02
     * @returns *
     */
    getStoreList(params){
        return this.get({
            url: this.API_HOST + `sys/store/storeList`,
            params
        })
    },
}
