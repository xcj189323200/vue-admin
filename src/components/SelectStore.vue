<template>
  <div id="SelectStore">
    <!-- <el-select v-model="selectId" filterable placeholder="请选择" @change="select_changeHandler">
      <el-option v-for="item in dataList" :key="item.storeId" :label="item.storeName" :value="item.storeId">
      </el-option>
    </el-select>-->
    <el-select
      v-model="selectId"
      filterable
      remote
      reserve-keyword
      placeholder="请输入门店名称"
      :remote-method="search_handler"
      @change="select_changeHandler"
      :loading="loading"
    >
      <el-option
        v-for="item in dataList"
        :key="item.storeId"
        :label="item.storeName"
        :value="item.storeId"
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
* @Description: 选择门店组件
*/
export default {
  props: ['storeId'],
  components: {
  },
  data() {
    return {
      dataList: [],
      // dataList:[{
      //   storeId:'',
      //   storeName:'全部'
      // }],
      loading: false,
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
      this.$emit('selectStore', val)
      console.log(val, 'val');
    },
    search_handler(storeName) {
      console.log(storeName);
      if (storeName) {
        this.$http.getStoreList({ storeName, size: 2000 }).then(data => {
          if (data) {
            let { content = [] } = data
            this.dataList = content
          }
        })
      } else {
        this.dataList = []
      }

    },
    /**
     * @description 获得数据 点击回调事件
     */
    // getData() {
    //   this.$http.getStoreList(this.params).then(data => {
    //     if (data) {
    //       let { content = [], totalPages } = data
    //       this.dataList = [...this.dataList, ...content]
    //       this.totalPages = totalPages
    //       if (this.params.page + 1 < this.totalPages) {
    //         this.params.page++
    //         this.getData()
    //       }
    //     }
    //   })
    // }
  },
  created() {
    if (this.storeId) {
      this.selectId = this.storeId
    }
    // this.getData()
  },
  watch: {
    storeId: {
      handler(val) {
        this.selectId = val
        if (!val) {
          this.dataList = []
        }
      }
    }

  }
}
</script>
<style lang="scss" scoped>
#SelectStore {
   
}
</style>

