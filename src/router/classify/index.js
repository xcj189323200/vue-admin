export default  [
    {
      path: '/classify/list',
      name: 'classifyList',
      component: () => import(/* webpackChunkName: "classList" */ '../../views/Classify/list.vue')
    },
    {
      path: '/classify/EditSubCategory',
      name: 'EditSubCategory',
      component: () => import(/* webpackChunkName: "EditSubCategory" */ '../../views/Classify/editSubCategory.vue')
    },
  ]

