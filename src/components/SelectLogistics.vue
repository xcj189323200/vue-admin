<template>
  <div id="SelectLogistics">
    <el-select
      v-model="selectId"
      filterable
      :disabled="disabled"
      placeholder="请选择"
      @change="select_changeHandler"
    >
      <el-option
        v-for="item in dataList"
        :key="item.expressId"
        :label="item.expressName"
        :value="item.expressId"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
/*
* @Author: 徐长剑
* @Date: 2018-07-27 14:57:16
* @LastEditors: 徐长剑
* @LastEditTime: 2018-07-27 18:23:23
* @Description: 选择物流组件
*/
export default {
  props: ['expressId', 'disabled'],
  components: {
  },
  data() {
    return {
      dataList: [],
      selectId: "",
      totalPages: 1,
      params: {
        page: 0,
        size: 2000,
      }
    }
  },
  methods: {
    /**
     * @description 选择 change回调事件
     */
    select_changeHandler(val) {
      this.$emit('selectHandler', val)
      console.log(val, 'val');
    },
    /**
     * @description 获得数据 点击回调事件
     */
    getData() {
      this.$http.getDeliveryCompany(this.params).then(data => {
        if (data) {
          let { content = [], totalPages } = data
          this.dataList = [...this.dataList, ...content]
          this.totalPages = totalPages
          if (this.params.page + 1 < this.totalPages) {
            this.params.page++
            this.getData()
          }
        }
      })
    }
  },
  created() {
    if (this.expressId) {
      this.selectId = this.expressId
    }
    this.getData()
  },
  watch: {
    selectId: {
      handler(val) {
        this.selectId = val
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

