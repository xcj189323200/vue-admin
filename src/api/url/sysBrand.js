/**
 * 云巢品牌接口
 */

export default {
    // 品牌列表
    getNewBrand(params){
        return this.get({
            url: this.API_HOST +  `sys/brand/brandList`,
            params
        })
    },
    // 删除品牌
    deleteNewBrand(params){
        return this.delete({
            url:  this.API_HOST + `sys/brand/deleteBrand/${params.brandId}`,
        })
    },

    // 新增品牌
    addBrand(data){
        return this.post({
            url: this.API_HOST +  `sys/brand/addBrand`,
            data: data
        })
    },

    // 编辑品牌
    editBrand(data){
        return this.post({
            url: this.API_HOST + `sys/brand/editBrand`,
            data: data
        })
    },

    // 品牌详情
    getBrandDetail(params){
        return this.get({
            url: this.API_HOST + `sys/brand/brandDetail/${params.brandId}`,
        })
    },
}
