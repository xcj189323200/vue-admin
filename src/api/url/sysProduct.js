/**
 * 云商品库数据接口
 */

// 获取SKU商品列表
export default {
    // 获取sku商品列表
    skuList(params){
        return this.get({
            url: this.API_HOST + `sys/product/skuList`,
            params
        })
    },
    // 获取spu商品列表
    spuList(params){
        return this.get({
            url: this.API_HOST + `sys/product/spuList`,
            params
        })
    },
    // 根据spuId获取spu详情
    getSpuById(params){
        return this.get({
            url: this.API_HOST + `sys/product/getSpuAndSkuByProductId/${params.id}`
        })
    },
    // 根据spuId获取spu详情
    getSkuBySkuId(params){
        return this.get({
            url: this.API_HOST + `sys/product/getSkuBySkuId/${params.skuId}`
        })
    },
    // 删除商品
    deleteProduct(data){
        return this.delete({
            url: this.API_HOST + `sys/product/deleteSku/${data.id}`
        })
    },
    // 添加商品
    addProduct(data){
        return this.post({
            url: this.API_HOST + `sys/product/addProduct`,
            data: data
        })
    },
    // 添加商品
    editProduct(data){
        return this.post({
            url: this.API_HOST + `sys/product/editProduct`,
            data: data
        })
    },
    /**
     * @description 设置标准化状态
     * @date 2018-11-02
     * @param {Number} storeSkuId
     * @param {boolean} standardFlag
     * @returns *
     */
    setStandardFlag(data){
        return this.post({
            url: this.API_HOST + `sys/product/setStandardFlag`,
            data
        })
    },
}
