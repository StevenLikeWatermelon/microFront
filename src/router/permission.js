import router from '@/router'
import store from '@/store'
import { Message } from 'xl-views'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/assets/js/storeToken'
import { makePath } from '@/assets/js/utils'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 不用检测权限白名单
const homePath = '/home'
// 跳转到login逻辑
const goToLogin = (to, next) => {
  // home不处理
  const id = to.query.id || ''
  const fullUrl = `${to.path}?id=${id}`
  to.path === homePath ? next('/login') : next(`/login?redirect=${encodeURI(fullUrl)}`)
}

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // 判断是否已经登录
  const hasToken = getToken()

  if (hasToken) {
    // 如果已经登陆了 所有路由都要先检查有没有菜单信息、用户信息以及第一个url 没有重新获取一次再跳转
    if (!store.getters.homePageConfig || !store.getters.homePageConfig.preUrl) {
      try {
        await store.dispatch('getAllUserInfo')
      } catch (error) {
        Message({
          message: error || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        // 获取信息失败要尝试清除token重新登陆
        store.commit('user/removeToken')
        goToLogin(to, next)
        NProgress.done()
      }
      console.log('has-get-new-info-data')
    }
    // 以下是确保了已经有了菜单信息、用户信息以及第一个url之后的逻辑
    if (to.path === '/login' || to.path === homePath) {
      // 如果登陆了还去登陆页或者vueRouterTabs的默认首页就直接跳转到第一个iframe
      console.log(store.getters.homePageConfig)
      const fullPath = makePath(store.getters.homePageConfig)
      next({ path: fullPath })
      NProgress.done()
    } else {
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单里直接跳转
      next()
    } else {
      // 其余的统一跳转到登录页面 但是home不需要带redirect
      console.log(to.path)
      goToLogin(to, next)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
