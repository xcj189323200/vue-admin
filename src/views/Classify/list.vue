<template>
  <div id="ClassifyList">
    <div class="container">
      <!-- 搜索头部 -->
      <SearchBar class="search_header">
        <div>
          <LabelItem label='分类名称:'>
            <el-input v-model="search.categoryName" placeholder="请输入分类名称"></el-input>
          </LabelItem>
        </div>
        <div class="btnBox">
          <el-button type="primary" icon="el-icon-search" :loading='flags.searchFlag' @click="search_clickHandler()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="edit_clickHandler()">新增</el-button>
        </div>
      </SearchBar>
      <!-- 表格 -->
      <TableList class="l-t" :loading='flags.loading' :dataList="dataList" :size='params.size' :total='totalElements' @pageChange='pageChange_handler' @sort-change="sortChange">
        <el-table-column align='center' prop="categoryName" label="一级分类" width="150">
        </el-table-column>
        <el-table-column align='center' prop="createTime" label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="showFlag" label="显示状态" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.showFlag ? "显示" : "隐藏"}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="sort" label="排序" width="80" sortable="custom">
        </el-table-column>
        <el-table-column align='center' prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit_clickHandler(scope.row)">编辑</el-button>
            <el-popover placement="top" width="160" v-model="scope.row.delFlag">
              <p>确定删除此分类吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.delFlag = false">取消</el-button>
                <el-button  type="primary" size="mini" @click="del_clickHandler(scope.row)">确定</el-button>
              </div>
              <el-button slot="reference" :style="{marginLeft:'10px'}" size="mini" type="danger">删除</el-button>
            </el-popover>
            <el-popover placement="top" width="160" v-model="scope.row.isShowFlag">
              <p>确定{{scope.row.showFlag?"隐藏":"显示"}}此分类吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.isShowFlag = false">取消</el-button>
                <el-button type="primary" size="mini" @click="isShow_clickHandler(scope.row)">确定</el-button>
              </div>
              <el-button slot="reference" :style="{marginLeft:'10px'}" size="mini">{{scope.row.showFlag?"隐藏":"显示"}}</el-button>
            </el-popover>
            <el-button size="mini" type="primary" :style="{marginLeft:'10px'}" @click="addChilderClass_clickHandler( scope.row)">新增子分类</el-button>
            <el-button size="mini" @click="ad_clickHandler( scope.row)">广告位</el-button>
          </template>
        </el-table-column>
      </TableList>
    </div>

    <Classify-Edit ref='editModal' :parentId='0' :categoryId='categoryId' @submit='editSubmit_handler'></Classify-Edit>
    <Ad-Edit ref='editAdModal'  :categoryId='categoryId' @submit='editSubmit_handler'></Ad-Edit>
  </div>
</template>

<script>
/*
* @Author: 徐长剑
* @Date: 2018-07-27 14:57:16
* @LastEditors: 徐长剑
* @LastEditTime: 2018-07-27 18:23:23
* @Description: 分类页面
*/
import SearchBar from '@components/Ui/SearchBar'
import LabelItem from '@components/Ui/LabelItem'
import TableList from '@components/Ui/TableList'
import ClassifyEdit from '@components/Classify/EditModal'
import AdEdit from '@components/Classify/EditAdModal'
import Utils from '@utils/utils'

export default {
  components: {
    SearchBar,
    LabelItem,
    TableList,
    ClassifyEdit,
    AdEdit,
  },
  data() {
    return {
      dataList: [],
      totalElements: 0, //总页数
      categoryId: '',
      search: {
        categoryName: '',//分类名称
      },
      flags: {
        searchFlag: false,
        loading: true,
        showFlag: false,
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
     * @description 搜索 点击回调事件
     */
    search_clickHandler() {
      this.flags.searchFlag = true
      let _params = Object.assign(this.params, this.search, {
        page: 1
      })
      this.params = Utils.filterParams(_params)
      this.getData()
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
    edit_clickHandler(row = {}) {
      let { categoryId } = row
      this.$refs.editModal.isShow = true
      this.categoryId = categoryId
    },
    /**
     * @description 新增编辑一级分类后 点击回调事件
     */
    editSubmit_handler() {
      this.getData()
    },
    /**
     * @description 删除 点击回调事件
     */
    del_clickHandler(record) {
      let { categoryId } = record
      this.$http.deleteCategory({ categoryId }).then(res => {
        if (typeof res === 'string') {
          this.$message.success('删除成功');
          this.getData()
          record.delFlag = false
        }
      })
    },
    /**
     * @description 新增子分类 点击回调事件
     */
    addChilderClass_clickHandler(record) {
      let { categoryId } = record
      this.$router.push({ name: 'EditSubCategory', query: { parentId: categoryId } })
    },
    /**
     * @description 广告 点击回调事件
     */
    ad_clickHandler(row) {
      let { categoryId } = row
      this.$refs.editAdModal.isShow = true
      this.categoryId = categoryId
    },
    /**
     * @description 显示隐藏 点击回调事件
     */
    isShow_clickHandler(record) {
      let { categoryId, showFlag } = record
      this.$http.setShowFlag({ categoryId, showFlag: !showFlag }).then(res => {
        if (!res) {
          this.$message.success('操作成功');
          this.getData()
        }
      })
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
      this.$http.categoryList(_params).then(data => {
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
     * @description 排序改变触发
     */
    sortChange(column) {
      if(column.order === 'descending') {
        this.params.sort = `${column.prop},DESC`
      } else {
        this.params.sort = `${column.prop},ASC`
      }
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
.container {
    // width: 900px;
    padding: 30px;
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

