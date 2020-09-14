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
    redirect: '/home',
    // 子路由里配置需要通过页签打开的页面路由
    children: [
      // 引入 RouterTab 内置路由以支持 Iframe 页签
      ...RouterTabRoutes,
      {
        path: 'home', // 默认页和父级路由一致
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: {
          title: '首页' // 页签标题
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
