<template>
  <div
    id="Classify"
    v-if="isShow"
  >
    <el-dialog
      title="广告位"
      :visible.sync='isShow'
      width='50%'
    >
      <div class="edit_container">
        <el-form
          ref='classifyForm'
          :model="datas"
          :rules='rules'
        >
          <el-form-item
            label="一级分类"
            prop="categoryName"
            :label-width="formLabelWidth"
          >
            <span>{{datas.categoryName}}</span> </el-form-item>
          <el-form-item
            label="banner广告位"
            prop="adImgUrl"
            :maxlength='30'
            :label-width="formLabelWidth"
          >
            <UploadImg
              :value.sync='datas.adImgUrl'
              @getUpload='(datas)=> this.datas.adImgUrl = datas[0]'
              :maxLength='1'
            ></UploadImg>
            <div>(尺寸530*180)</div>
          </el-form-item>
          <el-form-item
            label="热门品牌"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="datas.brandIds"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in brandList"
                :key="item.brandId"
                :label="item.brandName"
                :value="item.brandId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="isShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit_clickHandler"
        >确 定</el-button>
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
import UploadImg from "@components/Common/UploadImg";

export default {
  props: ["categoryId", "parentId"],
  components: {
    UploadImg
  },
  data() {
    // var checkAge = (rule, value, callback) => {
    //   let { datas } = this
    //   if (!datas.imgUrl) {
    //     return callback(new Error('请上传图片'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      datas: {
        categoryName: "",
        imgUrl: "",
        sort: "",
        brandIds: ""
      },
      isShow: false, //判断编辑框是 否弹出
      formLabelWidth: "120px",
      brandList: [], //品牌接口返回
      rules: {
        // categoryName: [{ required: true, message: '请输入分类名称', trigger: ['blur', 'change'] }],
        // adImgUrl: [{ required: true, validator: checkAge, message: '请上传图片', trigger: ['blur'] }],
      }
    };
  },

  methods: {
    /**
     * @description 获得数据 回调事件
     */
    getData() {
      let { categoryId } = this;
      if (categoryId) {
        this.$http.getCategoryAdAndBrands({ categoryId }).then(data => {
          if (data) {
            console.log(data);
            let brandIds = data.brands.map(k => k.brandId);
            delete data.brands;
            this.datas = { ...data, brandIds };
          }
        });
      }
    },
    /**
     * @description 获得数据 回调事件
     */
    getBrands() {
      this.$http.getNewBrand({ size: 2000, page: 0 }).then(data => {
        if (data) {
          console.log(data);
          let { content } = data;
          this.brandList = content;
        }
      });
    },
    /**
     * @description 报存提交 点击回调事件
     */
    submit_clickHandler() {
      let { categoryId } = this;
      let _params = { ...this.datas };
      let _data;

      this.$refs["classifyForm"].validate(async valid => {
        console.log();
        if (valid) {
          if (categoryId) {
            _data = await this.$http.addCategoryAdAndBrands(_params);
          }
          if (_data === "") {
            console.log(_data);
            this.$emit("submit");
            this.isShow = false;
            this.$message.success("操作成功");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {},
  computed: {},
  watch: {
    "datas.imgUrl"(val) {
      if (val) {
        this.$refs.classifyForm.clearValidate(["imgUrl"]);
      }
    },
    categoryId: {
      handler() {
        this.datas = {
          categoryName: "",
          sort: "",
          imgUrl: ""
        };
        this.getData();
        this.getBrands();
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.edit_container {
  width: 80%;
}
</style>

