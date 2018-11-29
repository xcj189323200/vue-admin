<template>
  <div id="GrocerList">
    <div class="container">
      <!-- 搜索头部 -->
      <SearchBar class="search_header">
        <div>
          <LabelItem label='供货商:'>
            <el-input v-model="search.supplierName" placeholder="请输入供货商名称"></el-input>
          </LabelItem>
        </div>
        <div class="btnBox">
          <el-button type="primary" icon="el-icon-search" :loading='flags.searchFlag' @click="search_clickHandler()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="edit_clickHandler()">新增</el-button>
        </div>
      </SearchBar>
      <!-- 表格 -->
      <TableList class="l-t" :loading='flags.loading' :dataList="dataList" :size='params.size' :total='totalElements' @pageChange='pageChange_handler'>
        <el-table-column align='center' fixed="left" prop="supplierName" label="供应商名称" width="185">
        </el-table-column>
        <el-table-column align='center' prop="checkCycle" label="对账周期" width="180">
          <template slot-scope="scope">
            <span v-if='scope.row.checkCycle === 0'>0-3天</span>
            <span v-if='scope.row.checkCycle === 1'>1-7天</span>
            <span v-if='scope.row.checkCycle === 2'>2-14天</span>
            <span v-if='scope.row.checkCycle === 3'>暂无</span>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="uncheckedBalance" label="未对账余额" width="180">
        </el-table-column>
        <el-table-column align='center' prop="availableBalance" label="已对账可用余额" width="85">
        </el-table-column>
        <el-table-column align='center' prop="checkedBalance" label="已对账余额" width="100">
        </el-table-column>
        <el-table-column align='center' prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <span v-if='scope.row.status === 1'>启用</span>
            <span v-if='scope.row.status === 2'>封存</span>
            <span v-if='scope.row.status === 3'>清除</span>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="provinceName" label="省份" width="170">
        </el-table-column>
        <el-table-column align='center' prop="cityName" label="城市" width="130">
        </el-table-column>
        <el-table-column align='center' prop="bank" label="开户行" width="130">
        </el-table-column>
        <el-table-column align='center' prop="accountName" label="账户名称" width="180">
        </el-table-column>
        <el-table-column align='center' prop="cardNo" label="银行卡号" width="115">
        </el-table-column>
        <el-table-column align='center' prop="contact" label="联系人" width="125">
        </el-table-column>
        <el-table-column align='center' prop="updateTime" label="操作时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime | formatTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' fixed="right" prop="operation" label="操作" width="185">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="scope.row.lockFlag !== 0" @click="edit_clickHandler(scope.row)">编辑</el-button>
            <el-button slot="reference" @click="del_clickHandler(scope.row)" :disabled="scope.row.lockFlag !== 0" :style="{marginLeft:'10px'}"  size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </TableList>
    </div>
  </div>
</template>

<script>
/*
  * @Author: txy
  * @Date: 2018-11-22 14:57:16
  * @LastEditors: txy
  * @LastEditTime: 2018-11-22 14:57:16
  * @Description: 供货商管理
  */
import SearchBar from '@components/Ui/SearchBar'
import LabelItem from '@components/Ui/LabelItem'
import TableList from '@components/Ui/TableList'
import Utils from '@utils/utils'
export default {
  components: {
    SearchBar,
    LabelItem,
    TableList,
    Utils
  },
  data(){
    return {
      search:{
        supplierName:'',//供货商名称
      },
      totalElements:0,
      flags:{
        searchFlag:false,
        loading:false
      },
      params:{
        page:1,
        size:40,
        supplierName:'',//供货商名称
      },
      dataList: []
    }
  },
  methods: {
    /**
     * @description 搜索 点击回调事件
     */
    search_clickHandler(){
      this.flags.searchFlag = true
      let _params =  Object.assign(this.params,this.search,{
        page: 1
      })
      this.params = Utils.filterParams(_params)
      this.getData()
    },
    /**
     * @description 分页 回调事件
     */
    pageChange_handler(page){
      this.params.page = page
      this.getData()
    },
    /**
     * @description 新增编辑 回调事件
     */
    edit_clickHandler(row = {}){
      let { id } = row
      this.$router.replace({ name: 'grocerEdit', query: {grocerId: id}})
    },
    /**
     * @description 删除 回调事件
     */
    del_clickHandler(record) {
      this.$confirm('您要删除该供货商吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let { id } = record
        this.$http.deleteSupplier({ id }).then(res => {
          if (typeof res === 'string') {
            this.getData()
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
     /**
     * @description 获得数据 点击回调事件
     */
    getData(){
      this.flags.loading = true
      let _params = Object.assign({},this.params,{
        parentId: 0,
        page : this.params.page - 1
      })
      this.$http.searchSupplier(_params).then(data=>{
        if(data){
          let { content = [] , totalElements} =data
          this.dataList = content
          this.totalElements = totalElements
        }
        this.flags.searchFlag = false
        this.flags.loading = false
      })
    }
  },
  created(){
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
.container {
    width: 1150px;
    margin: 20px auto;
    .page_box {
        margin: 30px;
        text-align: right;
    }
    .btnBox{
      position: relative;
      top: -50px;
    }
    .l-t{
      margin-top: -56px;
    }
}
</style>
