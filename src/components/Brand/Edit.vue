<template>
  <div id="Classify" v-if="isShow">
    <el-dialog :title="title" :visible.sync='isShow' width='500px'>
      <div class="edit_container">
        <el-form ref='brandForm' :model="datas" :rules='rules'>
          <el-form-item label="品牌名称" prop="brandName" :label-width="formLabelWidth">
            <el-input v-model="datas.brandName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="imgUrl" :label-width="formLabelWidth">
            <UploadImg :value.sync='datas.imgUrl' @getUpload='(datas)=> this.datas.imgUrl = datas[0]' :maxLength='1'></UploadImg>
            <div>(尺寸170*100)</div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit_clickHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*
* @Author: txy
* @Date: 2018-07-27 14:57:16
* @LastEditors: txy
* @LastEditTime: 2018-07-27 18:23:23
* @Description: 新增编辑品牌组件
*/
import UploadImg from '@components/Common/UploadImg'
export default {
  props: ['brandId'],
  components: {
    UploadImg
  },
  data() {
    var checkAge = (rule, value, callback) => {
      let { datas } = this
      if (!datas.imgUrl) {
        return callback(new Error('请上传图片'));
      } else {
        callback();
      }
    };
    return {
      datas: {
        brandName: '',
        imgUrl: ''
      },
      isShow: false,
      formLabelWidth: '80px',
      rules: {
        brandName: [{ required: true, message: '请输入品牌名称', trigger: ['blur', 'change'] }],
        imgUrl: [{ required: true, validator: checkAge, message: '请上传图片', trigger: ['blur'] }],
      }
    }
  },

  methods: {
    /**
     * @description 获得数据 点击回调事件
     */
    getData() {
      let { brandId } = this
      if (brandId) {
        this.$http.getBrandDetail({ brandId }).then(data => {
          if (data) {
            console.log(data);
            this.datas = data
          }
        })
      }
    },
    submit_clickHandler() {
      let { brandId } = this
      let _params = this.datas
      let _data

      this.$refs['brandForm'].validate(async (valid) => {
        console.log();
        if (valid) {
          if (brandId) {
            console.log(_params)
            _data = await this.$http.editBrand(_params)
          } else {
            _data = await this.$http.addBrand({ ..._params, parentId: 0 })
          }
          if (_data === "") {
            console.log(_data);
            this.$emit('submit')
            this.isShow = false
            this.$message.success('操作成功');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {
  
  },
  computed: {
    title() {
      return this.brandId ? '编辑品牌' : '新增品牌'
    }
  },
  watch: {
    "datas.imgUrl"(val) {
      if (val) {
        this.$refs.brandForm.clearValidate(['imgUrl'])
      }
    },
    brandId: {
      handler() {
        this.datas = {
          brandName: '',
          imgUrl: ''
        }
        this.getData()
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.edit_container {
    width: 80%;
}
</style>

