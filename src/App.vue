<template>
  <div id="app">
    <div v-if="$route.meta.isSide">
      <router-view></router-view>
    </div>
    <el-container v-else>
      <el-aside width="240px">
        <aside-nav></aside-nav>
      </el-aside>
      <el-container :style="{minHeight:minHeight}">
        <el-header>
          <headers></headers>
        </el-header>
        <el-main>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
          <!-- <router-view></router-view> -->
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
<script>
import "@css/main.scss";
// import { mapGetters } from "vuex";
import headers from "@components/Common/Header";
import asideNav from "@components/Common/AsideNav";

export default {
  name: "App",

  computed: {},
  data() {
    return {
      minHeight: document.documentElement.clientHeight + "px"
    };
  },
  components: {
    headers,
    asideNav
  },
  created() {},
  mounted() {},
  watch: {}
};
</script>
<style scoped lang="scss">
#app {
  width:100%;
  height:100%;
  box-sizing: border-box;
}
.el-header {
  padding: 0 !important;
}
.el-main {
  height: 100%;
  position: relative;
}
</style>

