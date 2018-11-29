export default  [
    {
      path: '/user/list',
      name: 'userList',
      component: () => import(/* webpackChunkName: "brandList" */ '../../views/User/list.vue')
    },
  ]

