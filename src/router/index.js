import Vue from 'vue'
import VueRouter from 'vue-router'
// RouterTab 内置路由
import { RouterTabRoutes } from 'vue-router-tab'

import Frame from '../views/Frame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Frame,
    // 子路由里配置需要通过页签打开的页面路由
    children: [
      // 引入 RouterTab 内置路由以支持 Iframe 页签
      ...RouterTabRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "login" */ '../views/error/404.vue')
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})

export default router
