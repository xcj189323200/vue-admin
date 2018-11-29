<template>
  <div class="g_labelItem" :style="{width:width}">
    <el-row>
      <el-col :span="7" >
        <div v-html="label"></div>
      </el-col>
      <el-col :span="17">
        <slot></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /*
  * @Author: 徐长剑
  * @Date: 2018-07-27 14:57:16
  * @LastEditors: 徐长剑
  * @LastEditTime: 2018-07-27 18:23:23
  * @Description: ui 组件 ---- 类似label 组件
  */
export default {
  props: ['label','width'],
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
.g_labelItem {
  display: inline-block;
  width: 300px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  margin: 10px 50px 10px 0;
}
</style>

