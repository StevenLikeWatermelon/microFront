import router from '@/router'
import store from '@/store'
import { MessageBox, Message } from 'xl-views'

// 组装url
export const makePath = (pathConfig = {}) => {
  const firstIframeUrl = pathConfig.sysURLWithPre || ''
  const firstIframeTitle = pathConfig.resName || ''
  const firstIframeIcon = pathConfig.icon || ''
  const firstIframeId = pathConfig.id || ''
  const fullUrl = `/iframe/${encodeURIComponent(firstIframeUrl)}/${firstIframeTitle}/${firstIframeIcon}?id=${firstIframeId}`
  return fullUrl
}
// 统一处理push tabs逻辑
export const pushPath = (pathConfig = {}) => {
  const fullPath = makePath(pathConfig)
  router.push(fullPath)
}

// 统一的token失效提示框

export const showTokenExpireBox = () => {
  MessageBox.confirm('您的登录已失效，点击取消可继续停留在当前页面', '确定登出', {
    confirmButtonText: '登出',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.commit('user/removeToken')
    location.reload()
  }).catch(() => {
    Message({
      message: '已取消',
      duration: 1000
    })
  })
}
