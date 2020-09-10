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
        path: '/home', // 默认页和父级路由一致
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: {
          title: '首页' // 页签标题
        }
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
          title: '页面', // 页签标题
          icon: 'icon-user', // 页签图标，可选
          tabClass: 'custom-tab', // 自定义页签 class，可选
          tips: '这是一个页面', // 页签提示，可选，如未设置则跟 title 一致
          key: 'path', // 路由打开页签规则，可选
          closable: false // 页签是否允许关闭，默认 `true`
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
