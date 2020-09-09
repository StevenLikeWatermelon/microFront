import Vue from 'vue'
import App from './App.vue'
import XlViews from 'xl-views'

import './assets/css/reset.css'

// 引入vue-router-tab组件和样式
import RouterTab from 'vue-router-tab'
import 'vue-router-tab/dist/lib/vue-router-tab.css'

import router from './router'
import store from './store'

Vue.use(XlViews)
Vue.use(RouterTab)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
