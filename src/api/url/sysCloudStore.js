/**
 * 云仓热销商品接口
 */
export default {
  /**
   * @description 获取新人礼商品列表
   * @date 2018-12-3
   * @param {*} params
   * @returns *
   */
  gethotSaleProductList(params){
    return this.get({
        url: this.API_HOST + `sys/hotSaleProduct/hotSaleProductList`,
        params
    })
  },
    /**
     * @description 设置热销排序
     * @date 2018-11-02
     * @param {Number} hotSaleId 商品ID
     * @param {Number} sort 排序
     * @returns *
     */
    setSort(params){
        return this.get({
            url: this.API_HOST + `sys/hotSaleProduct/setSort`,
            params
        })
    },
    /**
     * @description 添加热销商品
     * @date 2018-11-02
     * @param {Number} barCode
     * @returns *
     */
    addSaleProduct(data){
        return this.post({
            url: this.API_HOST + `sys/hotSaleProduct/addSaleProduct`,
            data
        })
    },
    /**
     * @description 删除热销商品
     * @date 2018-11-02
     * @param {Number} hotSaleId 商品id
     * @returns *
     */
    deleteSaleProduct(params){
        return this.delete({
            url:  this.API_HOST + `sys/hotSaleProduct/deleteSaleProduct/${params.hotSaleId}`,
        })
    },
    // 添加云仓商品
    addStoreSku(data){
        return this.post({
            url: this.API_HOST +  `sys/storeProduct/addStoreSku`,
            data
        })
    },
    // 删除品牌
    editStoreSku(data){
        return this.post({
            url:  this.API_HOST + `sys/storeProduct/editStoreSku`,
            data
        })
    },

    // 商品列表
    getStoreSkuList(params){
        return this.get({
            url: this.API_HOST +  `sys/storeProduct/storeSkuList`,
            params: params
        })
    },
    // 商品详情
    getStoreSkuDetail(params){
        return this.get({
            url: this.API_HOST + `sys/storeProduct/storeSkuDetail/${params.storeSkuId}`,
        })
    },

     // 设置上下架
     setShelfFlag(params){
        return this.get({
            url: this.API_HOST + `sys/storeProduct/setShelfFlag`,
            params
        })
    }
}
