<template>
  <div id="BrandList">
     <div class="container">
      <!-- 搜索头部 -->
      <SearchBar class="search_header">
        <div>
          <LabelItem label='品牌名称:'>
            <el-input v-model="search.brandName" placeholder="请输入分类名称"></el-input>
          </LabelItem>
        </div>
        <div class="btnBox">
          <el-button type="primary" icon="el-icon-search" :loading='flags.searchFlag' @click="search_clickHandler()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="edit_clickHandler()">新增</el-button>
        </div>
      </SearchBar>
      <!-- 表格 -->
      <TableList class="l-t" :loading='flags.loading' :dataList="dataList" :size='params.size' :total='totalElements' @pageChange='pageChange_handler'>
        <el-table-column align='center' prop="brandName" label="品牌名称" width="400">
        </el-table-column>
        <el-table-column align='center' prop="createTime" label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit_clickHandler(scope.row)">编辑</el-button>
            <el-button slot="reference" :style="{marginLeft:'10px'}" @click="del_clickHandler(scope.row)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </TableList>
      <!-- 编辑新增弹出框 -->
    </div>
    <Brand-Edit ref='editModal' :brandId='brandId' @submit='editSubmit_handler'></Brand-Edit>
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
import SearchBar from '@components/Ui/SearchBar'
import LabelItem from '@components/Ui/LabelItem'
import TableList from '@components/Ui/TableList'
import BrandEdit from '@components/Brand/Edit'
import Utils from '@utils/utils'

export default {
  data(){
    return {
      search:{
        brandName:'',//品牌名称
      },
      brandId:0,
      totalElements:0,
      flags:{
        searchFlag:false,
        loading:false,
      },
      params:{
        page:1,
        size:40,
        brandName:'',//品牌名称
      },
      dataList: [],
      deleteVisible: true
    }
    
  },
  components: {
    SearchBar,
    LabelItem,
    TableList,
    BrandEdit
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
     * @description 编辑 点击回调事件
     */
    edit_clickHandler(row={}){
      console.log(row)
      let {brandId} = row
      this.$refs.editModal.isShow = true
      this.brandId = brandId
    },
     /**
     * @description 删除 点击回调事件
     */
    del_clickHandler(row){
      this.$confirm('您要删除该品牌吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let { brandId } = row
        this.$http.deleteNewBrand({ brandId }).then(res => {
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
     * @description 新增编辑一级分类后 点击回调事件
     */
    editSubmit_handler(){
      this.getData()
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
      console.log(_params)
      this.$http.getNewBrand(_params).then(data=>{
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
    width: 900px;
    margin: 0 auto;
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
