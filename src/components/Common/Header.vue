
<template>
  <header>
    <div class="user_box">
      <el-dropdown size="medium">
        <span class="el-dropdown-link">
          {{userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="loginOut_clickHandler">退出</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
/*
 * @Author: 徐长剑
 * @Date: 2018-07-27 14:57:16
 * @LastEditors: 徐长剑
 * @LastEditTime: 2018-07-27 15:13:28
 * @Description: 头部组件
 */
import { mapActions, mapGetters } from "vuex";
import Utils from "@utils/utils";

export default {
  data() {
    return {
      showPopFlag: false, //控制用户信息弹出框显示隐藏
      userName: ""
    };
  },
  computed: {
    ...mapGetters({
      // userInfo: "getUserInfo",
      // stores: "getStores",
      // storeLen: "getStoreLen"
    })
  },
  props: [],
  components: {},
  methods: {
    ...mapActions(["loginOut"]),
    /**
     * 登出事件
     * */
    loginOut_clickHandler() {
      this.loginOut();
    }
  },
  created() {
    const { _userName } = Utils.getCookie();
    this.userName = _userName;
  },
  mounted() {},
  destroyed() {},
  watch: {}
};
</script>
<style scoped lang="scss">
$heightBase: 60px;
$bgColorBase: #fff;
.el-header {
  padding: 0 !important;
}

header {
  width: 100%;
  height: $heightBase;
  line-height: $heightBase;
  padding: 0 50px;
  background-color: $bgColorBase; // logo style
  border-bottom: 1px solid #e3e3e3;
  box-sizing: border-box;
  .user_box {
    float: right;
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>