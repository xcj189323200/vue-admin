<template>
  <div id="citySelect">
    <div class="block">
        <el-cascader
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
        </el-cascader>
    </div>
  </div>
</template>

<script>
/*
* @Author:txy
* @Date: 2018-07-27 14:57:16
* @LastEditors: txy
* @LastEditTime: 2018-07-27 18:23:23
* @Description: 城市组件
*/
const DateTemp = require('../../assets/city.json')
export default {
  props: ['regionCodeList'],
  data() {
    return {
        Date: DateTemp, // 获取到数据
        selectedOptions: this.regionCodeList     
    }
  },

  methods: {
    /**
     * @description 获得数据 点击回调事件
     */
    getData(data) {
        let options = [];
        data.province && data.province.forEach((province) => {
            options.push({
                value: province.provinceCode + '+' + province.province,
                key: province.provinceCode,
                label: province.province,
                children: []
            });
        });
        options.forEach((province) => {
            province.children = this.findParents(data.city, province.key, 'city');
            province.children.forEach(city => {
                city.children = this.findParents(data.area, city.key, 'area')
            });
        });
        return options;
    },
    /**
     * @description 找相对应的数据 点击回调事件
     */
    findParents(data, key, tag) {
        let result = [];
        data.forEach(item => {
            if(item.parentCode === key){
            result.push({
                value: item[`${tag}Code`] + '+' + item[tag],
                key: item[`${tag}Code`],
                label: item[tag]
            });
            }
        })
        return result;
    },
    /**
     * @description 点击事件
     */
    handleChange(value) {
        console.log(value);
        this.$emit('getRegionCodeList', value)
    }
  },
  created() {
    this.options = this.getData(this.Date.result)
  }
}
</script>
<style lang="scss" scoped>
.edit_container {
    width: 80%;
}
</style>

