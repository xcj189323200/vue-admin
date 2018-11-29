export default  [
    {
      path: '/brand/list',
      name: 'brandList',
      component: () => import(/* webpackChunkName: "brandList" */ '../../views/Brand/list.vue')
    },
  ]

