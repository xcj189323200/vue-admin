<template>
  <div id="Logistics" v-if="isShow">
    <el-dialog title="物流信息" center close-on-press-escape :visible.sync="isShow" width="50%">
      <div>
        <ul v-if="dataList.length">
          <li v-for="(item,index) in dataList" :key="index">
            <div class="list_item">
              <div class="list_item_time">{{item.acceptTime }}</div>
              <div class="list_item_des">{{item.acceptStation}}</div>
            </div>
          </li>
        </ul>
        <div v-else>
          暂无物流信息
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*
* @Author: 徐长剑
* @Date: 2018-07-27 14:57:16
* @LastEditors: 徐长剑
* @LastEditTime: 2018-07-27 18:23:23
* @Params: orderId 物流单号
* @Description: 物流信息
*/
import UploadImg from '@components/Common/UploadImg'

export default {
  props: ['orderId'],
  components: {
    UploadImg
  },
  data() {
    return {
      dataList: [],
      isShow: false,//判断编辑框是 否弹出
    }
  },

  methods: {
    /**
     * @description 获得数据 回调事件
     */
    getData() {
      let { orderId } = this
      if (orderId) {
        this.$http.orderDeliveryDetail({ orderId }).then(data => {
          if (data) {
            this.dataList = data
          }
        })
      }
    },
  },
  created() {

  },
  computed: {

  },
  watch: {
    orderId: {
      handler() {
        this.getData()
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
#Logistics {
   ul{
     li{
       margin-bottom: 20px;
       line-height: 30px;
       font-size: 14px;
       .list_item{
         display: flex;
         .list_item_time{
           flex: 1;
           color: #108ee9;
         }
         .list_item_des{
             flex: 2;
         }
       }
     }
   }
}
</style>

