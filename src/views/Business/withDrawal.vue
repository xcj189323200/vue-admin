<template>
  <div id="GrocerList">
    <div class="container">
      <!-- 搜索头部 -->
      <SearchBar class="search_header">
        <div>
          <label-item label="商户名称:">
            <el-input v-model="search.agentName" placeholder="请输入(支持模糊查询）"></el-input>
          </label-item>
          <label-item label="提现状态:">
            <el-input v-model="search.userName" placeholder="请输入(支持模糊查询）" style="width:250px;"></el-input>
          </label-item>
          <label-item label="日期:" width='400px'>
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
        </div>
        <div class="btnBox">
          <el-button
            type="primary"
            icon="el-icon-search"
            :loading="flags.searchFlag"
            @click="search_clickHandler()"
          >搜索</el-button>
          <el-button type="primary" icon="el-icon-close" @click="search_clearHandler()">清除</el-button>
          <el-button type="primary" icon="el-icon-download" @click="export_clickHandler()">导出</el-button>
        </div>
      </SearchBar>
      <div style="margin: 20px">
        <p>汇总数据：</p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span
            v-if="summ.beginDate !== ''"
          >{{summ.beginDate | formatDate}} 至 {{summ.endDate| formatDate}}，期间</span>
          总订单数为：{{summ.orderCnt || 0}}，其中门店订单数{{summ.storeOrderCnt || 0}}，云仓订单数{{summ.yuncangOrderCnt || 0}}；使用红包订单数{{summ.redPackOrderCnt || 0}}；门店交易金额汇总{{summ.storeAmount| formatNumber(2)
          }}，云仓交易金额汇总{{summ.yuncangAmount | formatNumber(2)}}；使用红包金额{{summ.redPackAmount | formatNumber(2)}};
        </p>
      </div>
      <!-- 表格 -->
      <TableList
        :loading="flags.loading"
        :dataList="dataList"
        :size="params.size"
        :total="totalElements"
        @pageChange="pageChange_handler"
        @sort-change="sortChange"
      >
        <el-table-column type="index" width="50" :index="indexMethod" label="序号"></el-table-column>
        <el-table-column align="center" prop="storeName" label="门店名称" width="180"></el-table-column>
        <el-table-column align="center" prop="agentName" label="代理商名称" width="180"></el-table-column>
        <el-table-column align="center" prop="userName" label="商户联系人" width="180"></el-table-column>
        <el-table-column align="center" prop="phone" label="商户联系方式" width="180"></el-table-column>
        <el-table-column align="center" prop="orderCnt" label="总订单数" width="180" sortable="custom"></el-table-column>
        <el-table-column align="center" prop="storeOrderCnt" label="门店订单数" width="170" sortable="custom"></el-table-column>
        <el-table-column align="center" prop="yuncangOrderCnt" label="云仓订单数" width="130" sortable="custom"></el-table-column>
        <el-table-column align="center" prop="redPackOrderCnt" label="使用红包订单数" width="130" sortable="custom"></el-table-column>
        <el-table-column align="center" prop="storeAmount" label="门店交易金额" width="180" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.storeAmount | formatNumber(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="yuncangAmount" label="云仓交易金额" width="115" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.yuncangAmount | formatNumber(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="redPackAmount" label="使用红包金额" width="125" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.redPackAmount | formatNumber(2)}}</span>
          </template>
        </el-table-column>
      </TableList>
    </div>
  </div>
</template>

<script>
/*
  * @Author: txy
  * @Date: 2018-07-27 14:57:16
  * @LastEditors: txy
  * @LastEditTime: 2018-07-27 18:23:23
  * @Description: 品牌管理
  */
// import { API_HOST } from "@api/config";
import SearchBar from '@components/Ui/SearchBar'
import LabelItem from '@components/Ui/LabelItem'
import TableList from '@components/Ui/TableList'
import SelectStore from '@components/SelectStore'
import Utils from '@utils/utils'

export default {
  components: {
    SearchBar,
    LabelItem,
    TableList,
    SelectStore,
    Utils
  },
  data() {
    return {
      search: {
        storeId: '',
        agentName: '',
        beginDate: '',
        orderTime: '',
        endDate: '',
        userName: ''//供货商名称
      },
      totalElements: 0,
      flags: {
        showdata: false,
        searchFlag: false,
        loading: false,
      },
      params: {
        page: 1,
        size: 40,
          sort:'',
          direction: ''
      },
      summ: {
        orderCnt: '', // 总订单数
        beginDate: '', // 查询起始日期
        endDate: '', // 查询结束日期
        storeOrderCnt: '', // 门店订单数
        yuncangOrderCnt: '', // 云仓订单数
        redPackOrderCnt: '', // 门店订单数
        storeAmount: '', // 门店内交易金额
        yuncangAmount: '', // 门店订单数
        redPackAmount: '', // 使用红包金额
      },
      dataList: []
    }
  },
  methods: {
    indexMethod(index) {
      return (this.params.page - 1) * 40 + index + 1;
    },
    /**
     * @description 搜索 点击回调事件
     */
    search_clickHandler() {
      this.flags.showdata = true
      this.flags.searchFlag = true
      let _params = Object.assign(this.params, this.search, {
        page: 1
      })

      if (this.params.orderTime && Utils.isArray(this.params.orderTime)) {
        this.params.beginDate = this.params.orderTime[0]
        this.params.endDate = this.params.orderTime[1]
        this.summ.beginDate = this.params.orderTime[0] // 搜索时，添加汇总数据
        this.summ.endDate = this.params.orderTime[1]
        this.params.orderTime = ''
      } else {
        this.summ.beginDate = ''
        this.summ.endDate = ''
      }

      this.params = Utils.filterParams(_params)
        // if(this.params.sort === '') {
        //     this.params.sort = 'orderCnt'
        // }
      this.getData()
    },
    /**
     * @description 清除搜索框
     */
    search_clearHandler() {
      this.search.storeId = ''
      this.search.orderTime = ''
      this.search.agentName = ''
      this.search.userName = ''
      this.summ.beginDate = ''
      this.summ.endDate = ''
    },
    // 导出数据
    export_clickHandler() {
      let _params = Object.assign(this.params, this.search, {
        page: 1
      })

      if (this.params.orderTime && Utils.isArray(this.params.orderTime)) {
        this.params.beginDate = this.params.orderTime[0]
        this.params.endDate = this.params.orderTime[1]
        this.params.orderTime = ''
      } else {
        this.summ.beginDate = ''
        this.summ.endDate = ''
      }
      this.params = Utils.filterParams(_params)
      this.$http.getorderExport(this.params).then(data => {
        if (data) {
          Utils.downloadStream(data, '订单监控数据.csv')
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
    toMoney(num) {
      num = parseFloat(num)
      num = num.toFixed(2)
      return num.toLocaleString()
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
        if(!_params.sort || _params.sort === '') {
            _params.sort = 'orderCnt'
            _params.direction = 'DESC'
        }

        console.log(_params)
      // 获取列表数据
      this.$http.getAllObserverData(_params).then(data => {
        if (data) {
          let { content = [], totalElements } = data
          this.dataList = content
          this.totalElements = totalElements
          this.flags.searchFlag = false
        }
        this.flags.loading = false
      })
      // 拼接汇总数据 by zbm
      this.$http.getSumObserverData(_params).then(data => {
        if (data) {
          this.summ = Object.assign(this.summ, data)
        }
      })
    },
      /**
       * @description 排序改变触发
       */
      sortChange(column) {
          if(column.order === 'descending') {
              this.params.sort = `${column.prop}`
              this.params.direction = `DESC`
          } else {
              this.params.sort = `${column.prop}`
              this.params.direction = `ASC`
          }
          this.getData()
      }

  },
  created() {
      this.getData()
  },
  filter: {
    toMoney: function (val) {
      val = parseFloat(val)
      val = val.toFixed(2)
      return val.toLocaleString()
    }
  }
}
</script>
