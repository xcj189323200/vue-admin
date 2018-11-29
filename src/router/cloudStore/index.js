export default  [
    //云商品管理
    {
      path: '/cloudStore/cloudStoreGoods/list',
      name: 'cloudStoreGoodsList',
      component: () => import(/* webpackChunkName: "cloudStoreGoodsList" */ '../../views/CloudStore/CloudStoreGoods/list.vue')
    },
    //云热销商品管理
    {
      path: '/cloudStore/cloudStoreHotGoods/list',
      name: 'cloudStoreHotGoodsList',
      component: () => import(/* webpackChunkName: "cloudStoreHotGoodsList" */ '../../views/CloudStore/CloudStoreHotGoods/list.vue')
    },
  ]

