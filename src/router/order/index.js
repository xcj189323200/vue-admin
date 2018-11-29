export default  [
    {
      path: '/order/list',
      name: 'mallOrderList',
      component: () => import(/* webpackChunkName: "mallOrderList" */ '../../views/Order/MallOrder/list.vue')
    },
    {
      path: '/order/detail',
      name: 'mallOrderDetail',
      component: () => import(/* webpackChunkName: "mallOrderList" */ '../../views/Order/MallOrder/detail.vue')
    },
    {
        path: '/order/observerlist',
        name: 'observerList',
        component: () => import(/* webpackChunkName: "observerList" */ '../../views/Order/ObserverData/list.vue')
    },
  ]

