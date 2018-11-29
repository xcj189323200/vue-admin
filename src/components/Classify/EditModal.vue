<template>
  <div id="Classify" v-if="isShow">
    <el-dialog :title="title" :visible.sync='isShow' width='50%'>
      <div class="edit_container">
        <el-form ref='classifyForm' :model="datas" :rules='rules'>
          <el-form-item label="分类名称" prop="categoryName" :label-width="formLabelWidth">
            <el-input v-model="datas.categoryName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序码" :maxlength='30' :label-width="formLabelWidth">
            <el-input type='number' v-model.number="datas.sort" autocomplete="off"></el-input>
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
* @Author: 徐长剑
* @Date: 2018-07-27 14:57:16
* @LastEditors: 徐长剑
* @LastEditTime: 2018-07-27 18:23:23
* @Params: parentId 0则代表一级分类 否则是二级分类
* @Description: 新增编辑一级分类或二级分类组件
*/
import UploadImg from '@components/Common/UploadImg'

export default {
  props: ['categoryId', "parentId"],
  components: {
    UploadImg
  },
  data() {
    return {
      datas: {
        categoryName: '',
        sort: ''
      },
      isShow: false,//判断编辑框是 否弹出
      formLabelWidth: '80px',
      rules: {
        categoryName: [{ required: true, message: '请输入分类名称', trigger: ['blur', 'change'] }],
      }
    }
  },

  methods: {
    /**
     * @description 获得数据 回调事件
     */
    getData() {
      let { categoryId } = this
      if (categoryId) {
        this.$http.getCategoryDetail({ categoryId }).then(data => {
          if (data) {
            console.log(data);
            this.datas = data
          }
        })
      }
    },
    /**
     * @description 报存提交 点击回调事件
     */
    submit_clickHandler() {
      let { categoryId, parentId } = this
      let _params = this.datas
      let _data

      this.$refs['classifyForm'].validate(async (valid) => {
        console.log();
        if (valid) {
          if (categoryId) {
            _data = await this.$http.editCategory(_params)
          } else {
            _data = await this.$http.addCategory({ ..._params, parentId })
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
      return this.categoryId ? '编辑分类' : '新增分类'
    }
  },
  watch: {
    isShow: {
      handler(val) {
        if (!val) return
        this.datas = {
          categoryName: '',
          sort: '',
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

