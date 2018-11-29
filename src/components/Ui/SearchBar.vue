<template>
  <div id="search_bar">
    <slot></slot>
  </div>
</template>

<script>
  /*
  * @Author: 徐长剑
  * @Date: 2018-07-27 14:57:16
  * @LastEditors: 徐长剑
  * @LastEditTime: 2018-07-27 18:23:23
  * @Description: 搜索栏组件
  */
export default {
  components: {
  },
  data() {
        return {
        }
      },
  methods:{
  },
  created(){
  },
  watch:{
  }
}
</script>
<style lang="scss" scoped>
#search_bar {
    margin: 0 0 30px 0 ;
    overflow: hidden;
    .btnBox {
        float: right;
    }
}
</style>

