/**
 * 云巢每日爆款接口
 */
export default {
  /**
   * @description 获取爆款商品列表
   * @date 2018-12-3
   * @param {*} params
   * @returns *
   */
  getHotDailyList(params){
    return this.get({
        // url: this.API_HOST + `sys/activities/hotDaily/manage/search`,
        url: this.API_HOST + `sys/hotDailyActivity/hotDailyList`,
        params
    })
  },
  /**
   * @description 更新爆款商品上下架
   * @date 2018-12-3
   * @param {*} data
   * @returns *
   */
  updateHotDailyShelfFlag(data) {
    return this.put({
      url:  this.API_HOST + `sys/hotDailyActivity/updateShelfFlag`,
      data: data,
    });
  },
  /**
   * @description 更新爆款商品排序
   * @date 2018-12-3
   * @param {*} data
   * @returns *
   */
  updateHotDailySort(data) {
    return this.put({
      url:this.API_HOST + `sys/hotDailyActivity/updateSort`,
      data: data,
    });
  },
  /**
   * @description 获取爆款商品信息图片
   * @date 2018-12-3
   * @param {*} params
   * @returns *
   */
  getHotDailyDetail(params){
    return this.get({
        // url: this.API_HOST + `sys/activities/hotDaily/${params.id}`,
        url: this.API_HOST + `sys/hotDailyActivity/hotDailyDetail/${params.id}`,
    })
  },
  /**
   * @description 新增爆款活动
   * @date 2018-12-5
   * @param {*} data
   * @returns *
   */
  addHotDaily(data){
    return this.post({
        // url: this.API_HOST + `sys/activities/hotDaily`,
        url: this.API_HOST + `sys/hotDailyActivity/addHotDaily`,
        data: data
    })
  },
  /**
   * @description 更新爆款活动
   * @date 2018-12-5
   * @param {*} data
   * @returns *
   */
  updataHotDaily(data){
    return this.put({
        // url: this.API_HOST + `sys/activities/hotDaily`,
        url: this.API_HOST + `sys/hotDailyActivity/updateHotDaily`,
        data: data
    })
  }
}
