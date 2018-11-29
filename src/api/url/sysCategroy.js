/**
 * 云巢分类接口
 */

export default {
    // 分类列表
    categoryList(params) {
        return this.get({
            url: this.API_HOST + `sys/category/categoryList`,
            params,
        });
    },

    // 添加分类
    addCategory(data) {
        return this.post({
            url: this.API_HOST + `sys/category/addCategory`,
            data: data,
        });
    },

    // 分类详情
    getCategoryDetail(params) {
        return this.get({
            url: this.API_HOST + `sys/category/categoryDetail/${params.categoryId}`,
        });
    },

    // 删除分类
    deleteCategory(params) {
        return this.delete({
            url: this.API_HOST + `sys/category/deleteCategory/${params.categoryId}`,
        });
    },

    // 编辑分类
    editCategory(data) {
        return this.post({
            url: this.API_HOST + `sys/category/editCategory`,
            data: data,
        });
    },

    // 全部分类
    getAllCategory() {
        return this.get({
            url: this.API_HOST + `sys/category/getAllCategory`,
        });
    },

    //查询分类广告位和品牌
    getCategoryAdAndBrands(params) {
        return this.get({
            url: this.API_HOST + `sys/category/queryCategoryAdAndBrands/${params.categoryId}`,
        });
    },

    // 添加分类广告位和热门品牌
    addCategoryAdAndBrands(data) {
        return this.post({
            url: this.API_HOST + `sys/category/saveCategoryAdAndBrands`,
            data: data,
        });
    },
    // 设置显示隐藏状态
    setShowFlag(params) {
        return this.get({
            url: this.API_HOST + `sys/category/setShowFlag`,
            params,
        });
    },
    /**
     * @description 查看订单物流
     * @date 2018-11-02
     * @returns *
     */
    getDeliveryCompany(params) {
        return this.get({
            url: this.API_HOST + `sys/category/expressCompanyList`,
            params,
        });
    },
};
