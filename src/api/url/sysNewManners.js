/**
 * 云巢新人礼接口
 */
export default {
    /**
     * @description 获取新人礼商品列表
     * @date 2018-12-3
     * @param {*} params
     * @returns *
     */
    getNewMannersList(params) {
        return this.get({
            url: this.API_HOST + `sys/newGiftActivity/giftActivityList`,
            params,
        });
    },
    /**
     * @description 更新新人礼商品上下架
     * @date 2018-12-3
     * @param {*} data
     * @returns *
     */
    updateShelfFlag(data) {
        return this.put({
            url: this.API_HOST + `sys/newGiftActivity/updateShelfFlag`,
            data: data,
        });
    },
    /**
     * @description 更新新人礼商品排序
     * @date 2018-12-3
     * @param {*} data
     * @returns *
     */
    updateSort(data) {
        return this.put({
            url: this.API_HOST + `sys/newGiftActivity/updateSort`,
            data: data,
        });
    },
    /**
     * @description 获取新人礼商品信息
     * @date 2018-12-3
     * @param {*} params
     * @returns *
     */
    getNewMannersSkuImg(params) {
        return this.get({
            url: this.API_HOST + `sys/newGiftActivity/giftDetail/${params.id}`,
        });
    },

    /**
     * @description 新增新人礼活动
     * @date 2018-12-5
     * @param {*} data
     * @returns *
     */
    addNewManners(data) {
        return this.post({
            url: this.API_HOST + `sys/newGiftActivity/addGift`,
            data: data,
        });
    },
    /**
     * @description 更新新人礼活动
     * @date 2018-12-5
     * @param {*} data
     * @returns *
     */
    updataNewManners(data) {
        return this.put({
            url: this.API_HOST + `sys/newGiftActivity/updateGift`,
            data: data,
        });
    },

    /**
     * @description 获取新人礼 选取sku商品列表 包含 chooseFlag
     */
    newPeopleProductList(params) {
        return this.get({
            url: this.API_HOST + `sys/newGiftActivity/storeSkuList`,
            params,
        });
    },
    /**
     * @description 获取新人礼banner
     */
    getBannerImg(params) {
        return this.get({
            url: this.API_HOST + `sys/newGiftActivity/bannerSearch`,
            params,
        });
    },
    /**
     * @description 上传新人礼banner
     */
    SyncBannerImg(data) {
        return this.post({
            url: this.API_HOST + `sys/newGiftActivity/uploadBanner`,
            data,
        });
    },

    /**
     * @description 推荐商品列表
     */
    recommendListsearch(params) {
        return this.get({
            url: this.API_HOST + `sys/recommend/recommendList`,
            params,
        });
    },
    /**
     * @description 添加推荐商品推荐
     */
    addNewGift(data) {
        return this.post({
            url: this.API_HOST + `sys/recommend/addRecommend`,
            data,
        });
    },
    /**
     * @description 更新推荐商品上下架
     * @date 2018-12-3
     * @param {*} data
     * @returns *
     */
    updateRecommendShelfFlag(data) {
        return this.put({
            url: this.API_HOST + `sys/recommend/updateShelfFlag`,
            data: data,
        });
    },
    /***
     * 删除推荐商品
     */
    deleteRecommend(params) {
        return this.delete({
            url: this.API_HOST + `sys/recommend/deleteRecommend/${params.activityId}`,
        });
    },
    /***
     * 排序 新人礼
     */
    sortRecommend(data) {
        return this.put({
            url: this.API_HOST + `sys/recommend/updateSort`,
            data,
        });
    },
    /**
     * @description 推荐商品 获取sku商品列表 包含 chooseFlag
     */
    skuProductList(params) {
        return this.get({
            url: this.API_HOST + `sys/recommend/storeSkuList`,
            params,
        });
    },

    //-----------
    /**
     * @description 获取新人礼（爆款）商品信息 === 公用接口
     * @date 2018-12-3
     * @param {*} params
     * @returns *
     */
    storeSkuDetail(params) {
        return this.get({
            url: this.API_HOST + `sys/storeProduct/storeSkuDetail/${params.storeSkuId}`,
        });
    },
     /**
     * @description 云仓热销商品 爆款 获取sku商品列表 包含 chooseFlag
     */
    hotProductList(params) {
        return this.get({
            url: this.API_HOST + `sys/storeProduct/storeSkuList`,
            params,
        });
    },
};
