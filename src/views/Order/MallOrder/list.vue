<template>
  <div id="MallOrderList">
    <div class="container">
      <!-- 搜索头部 -->
      <SearchBar class="search_header">
        <div>
          <label-item label="订单编号:">
            <el-input v-model="search.orderNum" placeholder="请输入订单编号"></el-input>
          </label-item>
          <label-item label="订单状态:">
            <el-select v-model="search.orderStatus" placeholder="请选择">
              <el-option
                v-for="item in orderStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </label-item>
          <label-item label="配送方式:">
            <el-select v-model="search.deliveryType" placeholder="请选择">
              <el-option
                v-for="item in deliveryTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </label-item>
          <el-collapse-transition>
            <transition-group v-show="moreFlag">
              <label-item label="订单类型:" :key="1">
                <el-select v-model="search.orderProperty" placeholder="请选择">
                  <el-option
                    v-for="item in orderPropertyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </label-item>
              <label-item label="供货商:" :key="2">
                <el-select v-model="search.supplierId" placeholder="请选择">
                  <el-option
                    v-for="item in supplierIdList"
                    :key="item.supplierId"
                    :label="item.supplierName"
                    :value="item.supplierId"
                  ></el-option>
                </el-select>
              </label-item>
              <label-item label="门店名称:" :key="3">
                <SelectStore
                  :storeId="search.storeId"
                  @selectStore="(storeId)=>{this.search.storeId = storeId}"
                ></SelectStore>
              </label-item>
              <label-item label="买家名称:" :key="5">
                <el-input v-model="search.buyerReceiptName" placeholder="请输入买家名称"></el-input>
              </label-item>
              <label-item label="订单时间:" width="400px" :key="4">
                <el-date-picker
                  style="width:400px;marginLeft: -28px;"
                  clearable
                  v-model="search.orderTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
              </label-item>
            </transition-group>
          </el-collapse-transition>
        </div>
        <div class="btnBox">
          <el-switch
            class="more_btn"
            v-model="moreFlag"
            active-color="#13ce66"
            inactive-color="#D2DDDD"
          ></el-switch>
          <el-button
            type="primary"
            icon="el-icon-search"
            :loading="flags.searchFlag"
            @click="search_clickHandler()"
          >搜索</el-button>
          <!-- <el-button type="primary" icon="el-icon-plus" @click="edit_clickHandler()">新增</el-button> -->
          <el-upload
            class="upload-demo"
            style="display: inline-block; margin: 10px"
            :show-file-list="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="uploadSuccess"
            accept=".xls, .xlsx, .csv"
          >
            <el-button @click="importExcel_clickHandler()" icon="el-icon-upload2">导入</el-button>
          </el-upload>
          <el-button
            :loading="exportLoading"
            @click="exportExcel_clickHandler()"
            icon="el-icon-download"
          >导出</el-button>
        </div>
      </SearchBar>
      <!-- 表格 -->
      <TableList
        :loading="flags.loading"
        :dataList="dataList"
        :size="params.size"
        :total="totalElements"
        @pageChange="pageChange_handler"
      >
        <el-table-column align="center" prop="orderNum" label="订单编号" width="180"></el-table-column>
        <el-table-column align="center" prop="orderTime" label="订单时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.orderTime | formatTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="orderStatus" label="状态" width="85"></el-table-column>
        <el-table-column align="center" prop="deliveryType" label="配送方式" width="100"></el-table-column>
        <el-table-column align="center" prop="supplierName" label="供货商名称" width="180"></el-table-column>
        <el-table-column align="center" prop="storeName" label="门店名称" width="170"></el-table-column>
        <el-table-column align="center" prop="storeContactName" label="门店联系人" width="130"></el-table-column>
        <el-table-column align="center" prop="storeContactPhone" label="联系电话" width="130"></el-table-column>
        <el-table-column align="center" prop="storeContactAddress" label="门店地址" width="180"></el-table-column>
        <el-table-column align="center" prop="buyerReceiptName" label="买家名称" width="115"></el-table-column>
        <el-table-column align="center" prop="buyerReceiptPhome" label="联系电话" width="125"></el-table-column>
        <el-table-column align="center" prop="buyerReceiptAddress" label="收件地址" width="125">
          <template slot-scope="scope">
            <span v-if="scope.row.deliveryType === '门店自提'">————</span>
            <span v-else>{{ scope.row.buyerReceiptAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="orderProperty" label="订单类型" width="125">
          <template slot-scope="scope">
            <span v-if="scope.row.orderProperty === 1">门店订单</span>
            <span v-else>平台订单</span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" prop="operation" label="操作" width="185">
          <template slot-scope="scope">
            <el-button @click="enter_clickHandler(scope.row,'check')" type="text" size="small">查看详情</el-button>
            <el-button
              @click="enter_clickHandler(scope.row,'publish')"
              type="text"
              size="small"
              v-if="scope.row['orderStatus'] == '待发货' && scope.row['orderProperty'] === 2"
            >发货</el-button>
            <el-button v-else-if="scope.row['orderStatus'] != '未支付' && scope.row['orderProperty'] !== 1 " type="text" size="small" @click="checkLogistics_clickHandler(scope.row)">查看物流</el-button>
          </template>
        </el-table-column>
      </TableList>
    </div>
    <logistics-modal :orderId="orderId" ref="logisticstModal"></logistics-modal>
  </div>
</template>

<script>
/*
* @Author: 徐长剑
* @Date: 2018-07-27 14:57:16
* @LastEditors: 徐长剑
* @LastEditTime: 2018-07-27 18:23:23
* @Description: 微商城页面
*/
import SearchBar from '@components/Ui/SearchBar'
import LabelItem from '@components/Ui/LabelItem'
import TableList from '@components/Ui/TableList'
import SelectStore from '@components/SelectStore'
import LogisticsModal from '@components/Order/LogisticsModal'
import Utils from '@utils/utils'

export default {
  components: {
    SearchBar,
    LabelItem,
    TableList,
    SelectStore,
    LogisticsModal,
  },
  data() {
    return {
      dataList: [],
      exportLoading: false,
      totalElements: 0,
      moreFlag: false,
      orderId: 0,
      search: {
        orderNum: '',//订单编号
        orderStatus: '',//订单状态
        deliveryType: '',//配送方式
        orderProperty: '',//订单类型
        supplierId: '',//供货商
        storeId: "",//门店名称
        orderTime: '',//订单时间
        buyerReceiptName: '',//买家名称
      },
      //订单状态 选择列表
      orderStatusList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "NO_PAY",
          label: "未支付"
        },
        {
          value: "NO_DELIVER",
          label: "待发货"
        },
        {
          value: "NO_TAKE",
          label: "待提货"
        },
        {
          value: "DISTRIBUTION",
          label: "配送中"
        },
        {
          value: "COMPLETE",
          label: "已完成"
        },
      ],
      //配送方式 选择列表
      deliveryTypeList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "SELF_LIFTING",
          label: "门店自提"
        },
        {
          value: "DELIVERY_HOME",
          label: "送货上门"
        },
      ],
      //订单类型 选择列表
      orderPropertyList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "门店订单"
        },
        {
          value: "2",
          label: "平台订单"
        },
      ],
      //供货商 选择列表
      supplierIdList: [
        {
          supplierId: "",
          supplierName: "全部"
        },
      ],
      flags: {
        searchFlag: false,
        loading: true,
      },
      params: {
        page: 1,
        size: 40,
        categoryName: '',//分类名称
      }
    }
  },
  methods: {
    /**
   * @description 初始化
   */
    init() {
      this.getData()
      this.getSupplierList()
    },
    /**
     * @description 搜索 点击回调事件
     */
    search_clickHandler() {
      console.log(this.search.orderTime, 'search.orderTime');
      this.flags.searchFlag = true
      let _params = Object.assign(this.params, this.search, {
        page: 1,
      })
      this.params = Utils.filterParams(_params)
      if (this.params.orderTime && Utils.isArray(this.params.orderTime)) {
        this.params.orderTimeFrom = this.params.orderTime[0]
        this.params.orderTimeTo = this.params.orderTime[1]
      }
      console.log(this.params, 'this.params');
      this.getData()
    },
    /**
     * @description 获得数据 点击回调事件
     */
    getSupplierList() {

      this.$http.getSupplierList({ page: 0, size: 2000 }).then(data => {
        if (data) {
          let { content = [] } = data
          this.supplierIdList.push(...content)
        }
      })
    },
    /**
     * @description 分页 回调事件
     */
    pageChange_handler(page) {
      this.params.page = page
      this.getData()
    },
    /**
     * @description 编辑 点击回调事件
     */
    enter_clickHandler(row, type) {
      let { orderId } = row
      this.$router.push({ name: 'mallOrderDetail', query: { orderId, type } })
    },

    /**
     * @description 获得数据 点击回调事件
     */
    getData() {
      this.flags.loading = true
      let _params = Object.assign({}, this.params, {
        parentId: 0,
        page: this.params.page - 1
      })
      this.$http.getWeiOrderList(_params).then(data => {
        if (data) {
          let { content = [], totalElements } = data
          this.dataList = content
          this.totalElements = totalElements
        }
        this.flags.searchFlag = false
        this.flags.loading = false
      })
    },
    /**
     * @description 查看物流
     */
    checkLogistics_clickHandler(row) {
      console.log(row)
      this.orderId = row.orderId
      console.log(this.$refs.logisticstModal)
      this.$refs.logisticstModal.isShow = true
    },
    /**
     * @description 导出表格数据
     */
    exportExcel_clickHandler() {
      if (this.exportLoading) return
      let _params = Object.assign({}, this.params, this.search)
      _params = Utils.filterParams(_params)
      if (_params.orderTime && Utils.isArray(_params.orderTime)) {
        _params.orderTimeFrom = _params.orderTime[0]
        _params.orderTimeTo = _params.orderTime[1]
      }
      delete _params.page;
      delete _params.size;
      delete _params.orderTime
      console.log(_params)
      this.exportLoading = true;
      this.$http.orderExport(_params).then(data => {
        this.exportLoading = false;
        if (data && !data.status) {
          Utils.downloadStream(data, '订单.csv')
        }
      })
    },
    /**
     * @description 导入数据
     */
    importExcel_clickHandler() {
      console.log('导入')
    },
    /**
     * @description 文件上传成功回调
     */
    uploadSuccess() {
      console.log('success')
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
.container {
   padding: 30px;
    margin: 0 auto;
    .page_box {
        margin: 30px;
        text-align: right;
    }
    .more_btn {
        margin-right: 20px;
    }
}
</style>

