
<template>
  <div class="UploadImg">
    <div class="previewBox">
      <el-upload v-show="maxLength > dataList.length" class="UploadBtn" action="http://dmsapi.dianjia001.com/file/uploadOSS/" list-type="picture-card" :data="{
        type: 7
      }" :on-success="successHandler" :before-upload='beforeUpload' :on-error='error_handler' multiple :show-file-list='false' :on-exceed='exceed_handler'>
        <i class="el-icon-plus"></i>
      </el-upload>
      <div v-for="(item,index) in dataList" :key="item" class="preview_item">
        <img :src="imgHost + item" alt="">
        <div class="preview_mb">
          <i class="el-icon-delete" @click="remove_clickHandler(index)"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  /*
  * @Author: 徐长剑
  * @Date: 2018-07-27 14:57:16
  * @LastEditors: 徐长剑
  * @LastEditTime: 2018-07-27 18:23:23
  * @Description: 侧边导航公共组件
  */
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      dataList: [],
      imgHost: "http://dj001.oss-cn-beijing.aliyuncs.com/",
    };
  },
  // props: ['maxLength', 'value','multiple'],
  props: {
    maxLength: Number,
    value: [Array, String],
    multipled: {
      type: Boolean,
      default() {
        return true
      }
    },
  },
  components: {},
  methods: {
    beforeUpload() {
      console.log(this.dataList.length, 'this.dataList.length');
      if (this.dataList.length >= this.maxLength) {
        this.$message({
          message: '最多上传' + this.maxLength + '张图片',
          type: 'warning'
        })
        return false
      }
    },
    exceed_handler(file) {
      // this.$message({
      //   message: '最多上传' + this.maxLength,
      //   type: 'warning'
      // });
      console.log(file, 'filefilefile');
    },
    successHandler(res, file) {
      console.log(file);
      if (res && res.msg) {
        if (this.dataList.length >= this.maxLength) {
          this.$message({
            message: '最多上传' + this.maxLength + '张图片',
            type: 'warning'
          })
          return false
        } else {
          let { result } = res
          let url = result.url
          this.dataList.push(url)
        }
      }
      console.log(res, 'response');
    },
    remove_clickHandler(index) {
      this.dataList.splice(index, 1)
    },
    error_handler(err) {
      this.$message({
        message: '上传失败，请稍后重试',
        type: 'error'
      });
      console.log(err);
    },
    // handlePictureCardPreview(file) {
    //   console.log(file);
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // }
  },
  created() {
    console.log(this.maxLength, 'maxLength');
  },
  mounted() {
    //  console.log(this.$route,'获得');

  },
  destroyed() { },
  watch: {
    value: {
      handler(val) {
        console.log(val, '=====');
        if (!val) return
        if (Array.isArray(val)) {
          this.dataList = [...val]
        } else {
          this.dataList = [val]
        }
      },
      immediate: true
    },
    dataList(val) {
      console.log(val, '-');
      this.$emit('getUpload', val)
    },
  }
};
</script>
<style  lang="scss">
.UploadImg {
    .UploadBtn {
        float: left;
        margin: 0 10px 10px 0;
        .el-upload-list__item {
            width: 100px;
            height: 100px;
            line-height: 100px;
        }
        .el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 100px;
            .el-icon-plus {
                font-size: 20px;
            }
        }
    }
    .previewBox {
        overflow: hidden;
        // float: left;
        .preview_item {
            position: relative;
            width: 100px;
            height: 100px;
            line-height: 100px;
            float: left;
            padding: 10px;
            border: 1px solid #d9d9d9;
            margin: 0 10px 10px 0;
            border-radius: 4px;
            box-sizing: border-box;
            img {
                width: 100%;
                height: 100%;
            }
            &:hover .preview_mb {
                display: block;
            }
            .preview_mb {
                position: absolute;
                top: 0;
                left: 0;
                display: none;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                font-size: 18px;
                color: #ffffff;
                text-align: center;
            }
        }
    }
}
</style>

