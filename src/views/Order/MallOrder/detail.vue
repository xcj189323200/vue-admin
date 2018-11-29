<template>
  <div id="MallOrderDetail">
    <div class="container">
      <template v-if="datas && datas.order">
        <!-- 订单详情 -->
        <div class="order info">
          <h2>订单详情</h2>
          <div class="info_cont">
            <el-row>
              <el-col :span="8">
                <label-item label="订单编号:">{{datas.order.orderNum}}</label-item>
              </el-col>
              <el-col :span="8">
                <label-item label="状态:">{{datas.order.orderStatus}}</label-item>
              </el-col>
              <el-col :span="8">
                <label-item label="配送方式:">{{datas.order.deliveryType}}</label-item>
              </el-col>
              <el-col :span="8" v-if="!['未支付'].includes(datas.order.orderStatus)">
                <label-item label="付款时间:">{{datas.order.payTime | formatTime}}</label-item>
              </el-col>
              <el-col :span="8" v-if="!['未支付', '待发货'].includes(datas.order.orderStatus)">
                <label-item label="发货时间:">{{datas.order.sendOutTime | formatTime}}</label-item>
              </el-col>
              <el-col :span="8">
                <label-item label="买家留言:">{{datas.order.remark || '无'}}</label-item>
              </el-col>
            </el-row>
            <el-row>
              <template
                v-if="['待发货', '配送中'].includes(datas.order.orderStatus) && datas.order.orderProperty === 2"
              >
                <el-col :span="8">
                  <label-item label="物流快递:">
                    <select-logistics
                      :disabled="flags.isEditFlag"
                      :expressId="datas.order.expressCompanyId"
                      @selectHandler="(id)=>{this.datas.order.expressCompanyId = id}"
                    ></select-logistics>
                  </label-item>
                </el-col>
                <el-col :span="8">
                  <label-item label="快递单号:">
                    <el-input
                      v-model="datas.order.expressNumber"
                      placeholder="请输入快递单号"
                      :disabled="flags.isEditFlag"
                    ></el-input>
                  </label-item>
                </el-col>
              </template>
              <template v-if="['待提货', '已完成'].includes(datas.order.orderStatus)">
                <el-col :span="8">
                  <label-item label="物流快递:">{{datas.order.expressCompany}}</label-item>
                </el-col>
                <el-col :span="8">
                  <label-item label="快递单号:">{{datas.order.expressNumber}}</label-item>
                </el-col>
              </template>

              <el-col
                :span="2"
                v-if="['配送中'].includes(datas.order.orderStatus) && flags.isEditFlag"
              >
                <label-item>
                  <el-button type="primary" @click="()=>{this.flags.isEditFlag = false}">修改</el-button>
                </label-item>
              </el-col>
              <el-col
                :span="2"
                v-if="['待发货', '配送中'].includes(datas.order.orderStatus) && datas.order.orderProperty === 2 && !flags.isEditFlag"
              >
                <label-item>
                  <el-button type="primary" @click="save_clickHandler">保存</el-button>
                </label-item>
              </el-col>
              <el-col :span="2" v-if="['已完成', '待提货', '配送中'].includes(datas.order.orderStatus)">
                <label-item>
                  <el-button type="primary" @click="checkLogistics_clickHandler">查看物流</el-button>
                </label-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 门店信息 -->
        <div class="store info">
          <h2>门店信息</h2>
          <div class="info_cont">
            <el-row>
              <el-col :span="8">
                <label-item label="门店名称:">{{datas.order.storeName}}</label-item>
              </el-col>
              <el-col :span="8">
                <label-item label="联系人:">{{datas.order.storeContactName}}</label-item>
              </el-col>
              <el-col :span="8">
                <label-item label="联系电话:">{{datas.order.storeContactPhone}}</label-item>
              </el-col>
              <el-col
                :span="24"
                :style="{margin:'10px 50px 10px 0',height: '40px','lineHeight':'40px'}"
              >
                <el-col :span="2">
                  <div>门店地址</div>
                </el-col>
                <el-col :span="22" style="marginLeft:-35px">{{datas.order.storeContactAddress}}</el-col>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 买家信息 -->
        <div class="user info">
          <h2>买家信息</h2>
          <div class="info_cont">
            <el-row>
              <el-col :span="8">
                <label-item label="用户姓名	">{{datas.order.buyerReceiptName}}</label-item>
              </el-col>
              <el-col :span="8">
                <label-item label="联系电话">{{datas.order.buyerReceiptPhome}}</label-item>
              </el-col>
              <el-col
                v-if="!['门店自提'].includes(datas.order.deliveryType)"
                :span="24"
                :style="{margin:'10px 50px 10px 0',height: '40px','lineHeight':'40px'}"
              >
                <el-col :span="2">
                  <div>联系电话</div>
                </el-col>
                <el-col :span="20">{{datas.order.buyerReceiptAddress}}</el-col>
              </el-col>
            </el-row>
          </div>
        </div>
      </template>
      <!-- 商品列表 -->
      <div class="shop info" v-if="datas && datas.items">
        <h2>商品列表</h2>
        <div class="info_cont">
          <el-table :data="datas.items" :span-method="mergeCol" stripe style="width: 100%">
            <el-table-column prop="skuName" header-align="center" align="right" label="商品名称"></el-table-column>
            <el-table-column prop="skuCode" header-align="center" align="center" label="商品条码"></el-table-column>
            <el-table-column
              prop="salePrice"
              header-align="center"
              align="center"
              label="单价"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="saleNum"
              header-align="center"
              align="center"
              label="数量"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="totalSalePrice"
              header-align="center"
              align="center"
              label="金额"
              width="150"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <logistics-modal :orderId="datas.order.orderId" ref="logisticstModal"></logistics-modal>
  </div>
</template>

<script>
/*
* @Author: 徐长剑
* @Date: 2018-11-27 14:57:16
* @LastEditors: 徐长剑
* @LastEditTime: 2018-11-27 18:23:23
* @Description: 微商城订单详情页面
*/
import LabelItem from '@components/Ui/LabelItem'
import TableList from '@components/Ui/TableList'
import SelectLogistics from '@components/SelectLogistics'
import LogisticsModal from '@components/Order/LogisticsModal'

// import Utils from '@utils/utils'

export default {
  components: {
    LabelItem,
    TableList,
    SelectLogistics,
    LogisticsModal,
  },
  data() {
    return {
      datas: {
        items: [],
        order: {}
      },
      flags: {
        isEditFlag: false,
      },
    }
  },
  computed: {
    query() {
      return this.$route.query
    }
  },
  methods: {
    /**
    * @description 初始化
    */
    init() {
      this.getData()
    },
    /**
    * @description 保存发货信息 点击回调事件
    */
    save_clickHandler() {
      let { orderId, expressCompanyId, expressNumber } = this.datas.order
      if (!expressCompanyId) {
        return this.$message.error('请选择物流快递');
      }
      if (!expressNumber) {
        return this.$message.error('请输入快递单号');
      }
      this.$http.saveOrderLogistics({ orderId, expressId: Number(expressCompanyId), expressNum: expressNumber }).then(data => {
        if (data === '') {
          this.$message.success('保存成功')
          this.getData()
        }
      })
    },
    /**
    * @description 查看物流信息 点击回调事件
    */
    checkLogistics_clickHandler() {
      this.$refs.logisticstModal.isShow = true
    },
    /**
    * @description 合并table 单元格
    */
    mergeCol({ row, columnIndex }) {
      let { orderId } = row
      if (!orderId) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 2) {
          return [0, 0];
        }
      }

    },
    /**
     * @description 获得数据
     */
    getData() {
      let { orderId } = this.query

      this.$http.getWorderDetail({ orderId }).then(data => {
        if (data) {
          let _arr = [
            {
              salePrice: "",
              skuName: "商品金额",
              saleNum: data.order.saleNumTotal,
              totalSalePrice: data.order["productMoney"],
            },
            {
              skuName: "运费",
              saleNum: "",
              totalSalePrice: data.order["deliveryMoney"],
            },
            {
              skuName: "订单金额",
              saleNum: "",
              totalSalePrice: data.order["orderMoney"],
            },
            {
              skuName: "红包抵扣",
              saleNum: "",
              totalSalePrice: data.order["redPackMoney"],
            },
            {
              skuName: "实际付款",
              saleNum: "",
              totalSalePrice: data.order["realPayMoney"]
            },
          ]
          this.flags.isEditFlag = ["配送中"].includes(data.order.orderStatus)
          this.datas = Object.assign({}, data, {
            items: [...data.items, ..._arr]
          })
          console.log(this.datas, '-------');
        }
      })
    }
  },
  created() {
    this.init()
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
#MallOrderDetail {
    min-width: 900px;
    .container {
        padding: 24px;
        > .info {
            > h2 {
                font-size: 16px;
                line-height: 22px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
                padding: 16px 0;
                border-radius: 4px 4px 0 0;
                background: #fff;
                color: rgba(0, 0, 0, 0.65);
                border-bottom: 1px solid #e8e8e8;
            }
            > .info_cont {
                padding: 15px 0;
                border-bottom: 1px solid #e8e8e8;
                font-size: 14px;
                color: #606266;
            }
        }
    }
}
</style>

