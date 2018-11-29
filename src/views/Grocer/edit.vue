<template>
  <div id="GrocerEdit">
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="基础信息"></el-step>
      <el-step title="配送区域"></el-step>
    </el-steps>
    <div class="container" v-if="active === 1">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="名称:" prop="supplierName">
              <el-input v-model="ruleForm.supplierName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人:" prop="contact">
              <el-input v-model="ruleForm.contact"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机:" prop="mobile">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址:" prop="regionCodeList">
              <CitySelect @getRegionCodeList='getRegionCodeList' :regionCodeList='regionCodeList'/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="电话:" prop="telephone">
              <el-input v-model="ruleForm.telephone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QQ号:" prop="qq">
              <el-input v-model="ruleForm.qq"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="传真:" prop="fax">
              <el-input v-model="ruleForm.fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮编:" prop="postcode">
              <el-input v-model="ruleForm.postcode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="详细地址:" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行:" prop="bank">
              <el-input v-model="ruleForm.bank"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="银行卡号:" prop="cardNo">
              <el-input v-model="ruleForm.cardNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户名称:" prop="accountName">
              <el-input v-model="ruleForm.accountName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="对账周期:" prop="checkCycle">
              <el-select v-model="ruleForm.checkCycle" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:">
              <el-radio v-model="status" label="1">启用</el-radio>
              <el-radio v-model="status"  label="2">封存</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn-position">
      <el-button style="margin-top: 12px;" @click="next_clickHandler()">下一步</el-button>
      </div>
    </div>
    <div class="container" v-if="active === 2">
      <div>
      <CityDispatch :supplierDeliveryRegions='supplierDeliveryRegions' :id='id' @supplierDelivery='supplierDelivery'></CityDispatch>        
      </div>
      <div class="btn-position">
        <el-button @click="prev_clickHandler()">上一步</el-button>
        <el-button @click="save_clickHandler()">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
/*
  * @Author: txy
  * @Date: 2018-07-27 14:57:16
  * @LastEditors: txy
  * @LastEditTime: 2018-07-27 18:23:23
  * @Description: 供应商编辑添加管理
  */
import CitySelect from '@components/Grocer/CitySelect'
import CityDispatch from '@components/Grocer/CityDispatchs'
export default {
  components: {
    CitySelect,
    CityDispatch
  },
  data(){
    return {
      status: '1',
      regionCodeList: [],
      id: 0, // 详情id
      supplierDeliveryRegions: [], // 配送的地址
      options: [{
        value: '0',
        label: '3天'
      }, {
        value: '1',
        label: '7天'
      }, {
        value: '2',
        label: '15天'
      }, {
        value: '3',
        label: '30天'
      }, {
        value: '4',
        label: '45天'
      }],
      ruleForm: {
        supplierName: '', //名称
        contact: '',  // 联系人
        mobile: '', //手机
        regionCodeList: '', //地址
        telephone: '',  // 电话
        qq: '', // QQ号
        address: '',  // 详细地址
        fax: '',  // 传真
        postcode: '', // 邮编
        bank: '', // 开户行
        cardNo: '', // 银行卡号
        accountName: '',  // 账户名称
        checkCycle: '', //对账周期
        status: '1' // 状态
      },
      rules: {
        supplierName: [
          { required: true, message: '请输入32字以内的供货商名称', trigger: 'blur', max: 32 }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入11位手机号码', trigger: 'blur', min: 11}
        ],
        bank: [
          { required: true, message: '请输入开户行', trigger: 'blur'}
        ],
        cardNo: [
          { required: true, message: '请输入银行卡号', trigger: 'blur'}
        ],
        accountName: [
          { required: true, message: '请输入账户名称', trigger: 'blur'}
        ],
        checkCycle: [
          { required: true, message: '请选择对账周期', trigger: 'blur'}
        ],
      },
      active: 1
    }
  },
  methods: {
    /**
     * @description 城市选择--点击回调事件
     */
    getRegionCodeList(value) {
      this.regionCodeList = value
    },
    /**
     * @description 配送区域 点击回调事件
     */
    supplierDelivery(value) {
      this.supplierDeliveryRegions = value
    },
    /**
     * @description 下一步 点击回调事件
     */
    next_clickHandler() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.active = 2;
        }
      })
    },
    /**
     * @description 上一步 点击回调事件
     */
    prev_clickHandler() {
     this.active = 1;
    },
    /**
     * @description 保存 点击回调事件
     */
    save_clickHandler() {
      let _parames = {
      }
      // 地址
      let regionCodeList = this.regionCodeList
      console.log(regionCodeList)
      if (regionCodeList.length > 1) {
        _parames.provinceCode = JSON.parse(regionCodeList[0].split("+")[0])
        _parames.provinceName = regionCodeList[0].split("+")[1]
        _parames.cityCode = JSON.parse(regionCodeList[1].split("+")[0])
        _parames.cityName = regionCodeList[1].split("+")[1]
        _parames.areaCode = JSON.parse(regionCodeList[2].split("+")[0])
        _parames.areaName = regionCodeList[2].split("+")[1]
      } else {
        _parames.provinceCode = JSON.parse(regionCodeList[0].split("+")[0])
				_parames.provinceName = regionCodeList[0].split("+")[1]
      }
      _parames.regionCodeList = regionCodeList
      // 名称
      _parames.supplierName = this.ruleForm.supplierName
      // 联系人
      _parames.contact = this.ruleForm.contact
      // 手机
      _parames.mobile = this.ruleForm.mobile
      // 电话
      _parames.telephone = this.ruleForm.telephone
       // QQ号
      _parames.qq = this.ruleForm.qq
       // 详细地址
      _parames.address = this.ruleForm.address
      // 传真
      _parames.fax = this.ruleForm.fax
      // 邮编
      _parames.postcode = this.ruleForm.postcode
      // 开户行
      _parames.bank = this.ruleForm.bank
      // 银行卡号
      _parames.cardNo = this.ruleForm.cardNo
      // 账户名称
      _parames.accountName = this.ruleForm.accountName
      // 对账周期
      switch (this.ruleForm.checkCycle) {
            case '3天':
              this.ruleForm.checkCycle = 0
              break;
            case '7天':
              this.ruleForm.checkCycle = 1
              break;
            case '15天':
              this.ruleForm.checkCycle = 2
              break;
            case '30天':
              this.ruleForm.checkCycle = 3
              break;
            default:
              this.ruleForm.checkCycle = 4
              break;
          }
      _parames.checkCycle = this.ruleForm.checkCycle
      // 状态
      _parames.status = this.ruleForm.status
      // 配送货的地址
      _parames.supplierDeliveryRegions = this.supplierDeliveryRegions
      if (this.id) {
        _parames.id = this.id
        this.$http.saveOrUpdataSupplier(_parames).then(res => {
          this.$message.success('保存成功');
          if (res.id) {
            this.$router.replace({ name: 'grocerList'})
          }
        })
      } else {
        this.$http.saveOrUpdataSupplier(_parames).then(res => {
          this.$message.success('保存成功');
          if (res.id) {
            this.$router.replace({ name: 'grocerList'})
          }
        })
      }
      
      
    },
    /**
     * @description 获取详细信息 点击回调事件
     */
    getDate() {
      this.$http.getSupplierDetail({id: this.id}).then(res => {
        if (res) { 
          switch (res.checkCycle) {
            case 0:
              res.checkCycle = '3天'
              break;
            case 1:
              res.checkCycle = '7天'
              break;
            case 2:
              res.checkCycle = '15天'
              break;
            case 3:
              res.checkCycle = '30天'
              break;
            default:
              res.checkCycle = '45天'
              break;
          }
          this.status = res.status + ''
          this.regionCodeList.push(res.provinceCode + '+' + res.provinceName)
          this.regionCodeList.push(res.cityCode + '+' + res.cityName)
          this.regionCodeList.push(res.areaCode + '+' + res.areaName)
          this.ruleForm = res
          this.supplierDeliveryRegions = res.supplierDeliveryRegions
        }
      })
    }
    
  },
  created(){
    this.id = this.$route.query.grocerId
    if (this.id) {
      this.getDate()
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
    width: 900px;
    margin: 20px auto;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    padding: 40px 20px 30px 20px;
    position: relative;
    min-height: 400px;
    .btn-position{
      text-align: right;
      margin-top: 30px;
    }
}
</style>
