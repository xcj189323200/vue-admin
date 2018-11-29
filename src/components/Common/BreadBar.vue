
<template>
  <header>
    <div class="breadBar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <slot></slot>
      </el-breadcrumb>
    </div>
  </header>
</template>
<script>
/*
* @Author: 徐长剑
* @Date: 2018-07-27 14:57:16
* @LastEditors: 徐长剑
* @LastEditTime: 2018-07-27 15:13:28
* @Description: 面包屑组件
*/

export default {
  data() {
    return {
      showPopFlag: false //控制用户信息弹出框显示隐藏
    };
  },
  computed: {

  },
  props: [],
  components: {},
  methods: {
  },
  created() { },
  mounted() { },
  destroyed() { },
  watch: {}
};
</script>
<style scoped lang="scss">

.breadBar{
  margin: 24px;
}

</style>