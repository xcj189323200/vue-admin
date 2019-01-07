<template>
  <div id="tableList">
    <el-table
      :data="dataList"
      border
      stripe
      style="width: 100%"
      :max-height="maxHeight"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @sort-change="sortChange"
      id="outTable"
    >
      <slot></slot>
    </el-table>
    <div class="page_box">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change='pageChange_handler'
        :current-page='page'
        :page-size.sync='size'
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 18:23:23
 * @Description: table 二次封装
 */
export default {
  props: ["loading", "dataList", "size", "total", "page"],
  components: {},
  data() {
    return {
      maxHeight: window.innerHeight > 700 ? "700" : "500"
      // maxHeight: window.innerHeight > 700 ? "500" : "300"
    };
  },
  methods: {
    /**
     * @description 分页 回调事件
     */
    pageChange_handler(page) {
      this.$emit("pageChange", page);
    },
    /**
     * @description 排序 回调事件
     */
    sortChange(column) {
      this.$emit("sort-change", column);
    }
  },
  created() {},
  watch: {
    page() {
      console.log(this.page, "page------");
    }
  }
};
</script>
<style lang="scss" scoped>
#tableList {
  min-width: 900px;
}
.page_box {
  margin: 30px;
  text-align: right;
}
</style>

