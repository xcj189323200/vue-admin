/**
 * 云巢品牌接口
 */

export default {
    // 供货商列表
    getSupplierList(params){
        return this.get({
            url: this.API_HOST +  `sys/supplier/supplierList`,
            params
        })
    },
    // 供货商查询
    searchSupplier(params){
        return this.get({
            url:  this.API_HOST + `sys/supplier/search`,
            params
        })
    },

    // 删除供货商
    deleteSupplier(data){
        return this.delete({
            url: this.API_HOST +  `sys/supplier/delete/${data.id}`,
            data: data
        })
    },

    //  获取供货商详情
    getSupplierDetail(data){
        return this.get({
            url: this.API_HOST + `sys/supplier/getById/${data.id}`,
            data: data
        })
    },

    // 更新或保存供货商
    saveOrUpdataSupplier(data){
        return this.post({
            url: this.API_HOST + `sys/supplier/saveOrUpdate`,
            data: data
        })
    },
}
