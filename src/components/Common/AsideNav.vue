
<template>
  <div id="aside">
    <div class="aside_header" @click="enterHome_clickHandler">店佳云巢平台</div>
    <el-menu
      :default-openeds="subMenuActive"
      :unique-opened="true"
      :default-active="childMenuActive"
      class="el-menu-vertical-demo"
      width="240px"
      background-color="#333"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="(item) in datas">
        <el-submenu :index="item.path" :key="item.path" v-if="item.children">
          <template slot="title">
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group
            v-for="(children,childrenIndex) in item.children"
            :key="childrenIndex"
          >
            <router-link :to="{name : children.path}">
              <el-menu-item :index="children.path">{{children.name}}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <router-link :to="{name : item.path}" :key="item.path" v-else>
          <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
        </router-link>
      </template>
    </el-menu>
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
      subMenuActive: [], //一级菜单选中的菜单
      childMenuActive: "", //二级菜单选中的菜单
      datas: [
        // {
        //     name: '用户管理',
        //     path: 'userList',
        // },
        {
          name: '分类管理',
          path: 'classifyList',
        },
        {
          name: '品牌管理',
          path: 'brandList',
        },
        {
          name: '货商管理',
          path: 'grocerList',
        },
        {
          name: '订单管理',
          path: 'order',
          children: [
            {
              name: '微商城管理',
              path: 'mallOrderList',
            },
            {
              name: '订单数据监测',
              path: 'observerList',
            }
          ]
        },
          {
              name: '设置',
              path: 'business',
              children: [
                  {
                      name: '商户提现设置',
                      path: 'withDrawal',
                  }
              ]
          }
        // {
        //   name:'云仓',
        //   path:'cloudStore',
        //   children:[
        //     {
        //       name:'云仓商品管理',
        //       path:'cloudStoreGoodsList',
        //     },
        //     {
        //       name:'云仓热销商品管理',
        //       path:'cloudStoreHotGoodsList',
        //     }
        //   ]
        // }
      ]
    };
  },
  props: [],
  components: {},
  methods: {
    enterHome_clickHandler() {
      this.$router.push({ name: 'home' })
    }
  },
  created() {

  },
  mounted() {
    //  console.log(this.$route,'获得');

  },
  destroyed() {
  },
  watch: {
    // /**
    //  * 根据路由变化 记录导航选中状态
    //  * */
    $route(to) {
      let { name, path } = to;
      this.subMenuActive = [path.split("/")[1]];
      this.childMenuActive = name || "home";
    }
  }
};
</script>
<style scoped lang="scss">
#aside {
    min-height: 100%;
    overflow: hidden;
    color: rgb(255, 255, 255);
    background-color: rgb(51, 51, 51);
    .aside_header {
        height: 32px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        line-height: 32px;
        margin: 30px auto;
        cursor: pointer;
    }
    .el-menu {
        border: none;
    }
}
</style>

