<template>
  <div class="c-citySelectBox">
    <div class="c-citySelectBox__content--left">
    <div>
    <el-checkbox label='全部' :checked="totalChecked" @change="handleTotalChange()">全部</el-checkbox>
    </div>
      <el-checkbox
        :label='item.provinceCode'
        v-model="item.checked"
        v-for="(item) in provinceList"
        :key="item.provinceCode"
        @change="handleProvinceChange(item)"
      >{{item.province}}</el-checkbox>
    </div>
    <div class="c-citySelectBox__content--right">
      <div
        v-for="(item, cityIndex) in cityArr"
        :key="cityIndex"
      >
        <p style="margin: 15px 0px;">{{item.province}}</p>
        <el-checkbox
        :checked="cityele.checked"
          :label="cityele.cityCode"
          v-for="(cityele, zindex) in item.children"
          :key="zindex"
          @change="handleCityChange(cityele)"
        >
          {{cityele.cityName}}
        </el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
/*
* @Author:txy
* @Date: 2018-07-27 14:57:16
* @LastEditors: txy
* @LastEditTime: 2018-07-27 18:23:23
* @Description: 城市配送组件
*/
const DateTemp = require('../../assets/city.json')
import _ from 'lodash'
export default {
  props: ['supplierDeliveryRegions', 'id'],
  data() {
    return {
        Date: DateTemp, // 获取到数据
        provinceList: [],   // 省份的数据
        cityList: [],    // 城市的数据
        cityArr: [], //展示的城市
        tempObj: {
            children: []
        },
        totalChecked: false, // 全部的地址
        supplierDelivery: [],    //保存时的数据格式
        defalutDate: []
    }
  },

  methods: {
    /**
     * @description 获取全国的城市 点击回调事件
     */
    handleTotalChange() {
        this.totalChecked = !this.totalChecked
        if (this.totalChecked) {
            this.getToatalCity()
            if (this.supplierDelivery.length) {
                this.$emit('supplierDelivery', this.supplierDelivery)            
            }      
        } else {
            this.cityArr = []
            this.supplierDelivery = []
            this.$emit('supplierDelivery', this.supplierDelivery)  
            this.provinceList.map(item => {
                item.checked = false
            })
        }
    },
    /**
     * @description 获取全国的城市 点击回调事件
     */
    getToatalCity() {
        this.cityArr = []
        this.supplierDelivery = []
        const cityTemp = _.groupBy(this.cityList, 'parentCode')
        let _cityArr = Object.keys(cityTemp)
        _cityArr.map(k => {
            this.provinceList.map(item => {
                item.checked = true
                if (Number(k) === Number(item.provinceCode)) {
                    this.tempObj = {
                        children: []
                    }
                    this.tempObj.provinceCode = item.provinceCode
                    this.tempObj.province = item.province
                    cityTemp[k].map(cityItem => {
                        let _quertDate = {
                            cityCode: cityItem.cityCode,
                            cityName: cityItem.city,
                            provinceCode: item.provinceCode,
                            provinceName: item.province,
                            checked: true
                        }
                        this.tempObj.children.push(_quertDate)
                        this.supplierDelivery.push(_quertDate)
                    })
                }
            })
            this.cityArr.push(this.tempObj)
        })
    },
    /**
     * @description 获得省份数据 点击回调事件
     */
    handleProvinceChange(el){
        // el.checked = !el.checked
        this.tempObj = {
            children: []
        }
        if (el.checked === true) {
            this.getCityDate(el)
        } else {
            // 展示数据
            this.cityArr.map((item, index) => {
                if (item.provinceCode === el.provinceCode) {
                    this.cityArr.splice(index, 1)
                }
            })
            // 保存提交数据
            let _arr = []
            this.supplierDelivery.map((sitem) => {
                if (sitem.provinceCode !== el.provinceCode) {
                    _arr.push(sitem)
                }
            })
            this.supplierDelivery = _arr
        }
        if (this.supplierDelivery.length) {
            this.$emit('supplierDelivery', this.supplierDelivery)            
        }
    },
    /**
     * @description 获得城市数据 点击回调事件
     */
    handleCityChange(cl) {
        cl.checked = !cl.checked
        // 单独点击城市时去掉该城市
        if (cl.checked) {
            this.supplierDelivery.push(cl)
        } else {
            this.supplierDelivery.map((citem, cindex) => {
                if (Number(citem.cityCode) === Number(cl.cityCode)) {
                    this.supplierDelivery.splice(cindex, 1)
                }
            })
        }
        this.$emit('supplierDelivery', this.supplierDelivery)
    },
    /**
     * @description 获取相对应省份的城市 点击回调事件
     */
    getCityDate(el){
        this.cityList.map(item => {
            if (Number(item.parentCode) === Number(el.provinceCode)) {
                // 展示时用的数据
                let {provinceCode ,province} = el
                let {cityCode ,city} = item
                Object.assign(this.tempObj,{
                    provinceCode ,
                    province 
                })
                let _param = {
                    cityCode,
                    cityName: city,
                    provinceCode,
                    provinceName: el.province,
                    checked: true
                }
                this.tempObj.children.push(_param)
                // 保存时用的数据
                this.supplierDelivery.push(_param)
            }
        })
        // 香港，澳门，台湾特殊数据
        if (el.provinceCode === '810000' || el.provinceCode === '820000' || el.provinceCode === '710000') {
            let {provinceCode ,province} = el
            Object.assign(this.tempObj,{
                provinceCode ,
                province 
            })
            let _query = {
                cityCode: provinceCode,
                cityName: province,
                provinceCode:  provinceCode,
                provinceName: province,
                checked: true 
            }
            this.tempObj.children.push(_query)
            this.supplierDelivery.push(_query)
        }
        this.cityArr.push(this.tempObj)
    },
    /**
     * @description 获取省份 点击回调事件
     */
    getCityDispatch() {
        if (this.Date && this.Date.isSuccess) {
            this.provinceList = this.Date.result.province
            this.provinceList.map(provinceItem => {
                provinceItem.checked = false
            })
            this.cityList = this.Date.result.city
        }
    },
    /**
     * @description 处理默认省市数据 点击回调事件
     */
    defalutCitySelect() {
        const temp = _.groupBy(this.supplierDeliveryRegions, 'provinceCode')
        const cityTemp = _.groupBy(this.cityList, 'parentCode')
        let _proviceArr = Object.keys(temp)
        if (_proviceArr.length === 34) {
            this.totalChecked = true
        }
        _proviceArr.map(k=>{
            this.provinceList.map(item=>{   
                if (Number(k) === Number(item.provinceCode)) {
                    this.tempObj = {
                        children: []
                    }
                    this.tempObj.provinceCode = item.provinceCode
                    this.tempObj.province = item.province
                    
                    cityTemp[k].map(cityItem => {
                        let _quertDate = {
                            cityCode: cityItem.cityCode,
                            cityName: cityItem.city,
                            provinceCode: item.provinceCode,
                            provinceName: item.province,
                            checked: false
                        }
                        temp[k].map(tempItem => {
                            if (Number(tempItem.cityCode) === Number(cityItem.cityCode)) {
                                _quertDate.checked = true
                            }
                        })
                        this.tempObj.children.push(_quertDate)
                        this.supplierDelivery.push(_quertDate)
                    })
                    item.checked = true
                }                
            })
            this.cityArr.push(this.tempObj)
        })
    }
  },
  created() {
    this.getCityDispatch()
      
    if (this.id) {
        this.defalutCitySelect()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-checkbox{
    width: 30%;
    margin-bottom: 10px;
}
.el-checkbox+.el-checkbox {
    margin-left: 0px !important;
}
.c-citySelectBox{
    overflow: hidden;
}
// .c-citySelectBox__content--left:before{content:"";position:absolute;right:0;top:0;width:1px;height:100%;background:#ddd;}
.c-citySelectBox__content--left{width:46%;min-height:350px;float:left;position:relative;}
.c-citySelectBox__content--right{width:52%;height: 500px; overflow: auto;float:left;position:relative;padding-left:2%;}
.c-citySelectBox__content--right:after{content:"";position:absolute;left:0;top:0;width:1px;height:100%;background:#ddd;}
</style>

