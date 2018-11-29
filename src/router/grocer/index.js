export default  [
    //货商管理
    {
      path: '/grocer/list',
      name: 'grocerList',
      component: () => import(/* webpackChunkName: "grocerList" */ '../../views/Grocer/list.vue')
    },
    //货商添加-编辑管理
    {
      path: '/grocer/edit',
      name: 'grocerEdit',
      component: () => import(/* webpackChunkName: "grocerEdit" */ '../../views/Grocer/edit.vue')
    },
  ]

