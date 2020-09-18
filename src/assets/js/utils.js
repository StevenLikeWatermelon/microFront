import router from '@/router'
import store from '@/store'
import { MessageBox, Message } from 'xl-views'
import { getUrlParams } from 'xl-utils'
// 组装url
export const makePath = (pathConfig = {}) => {
  const iframeUrl = pathConfig.sysURLWithPre || ''
  const iframeTitle = pathConfig.resName || ''
  const iframeIcon = pathConfig.icon || ''
  const iframeId = pathConfig.id || ''
  const fullUrl = `/iframe/${encodeURIComponent(iframeUrl)}/${iframeTitle}/${iframeIcon}?id=${iframeId}`
  return fullUrl
}

// 统一处理push tabs逻辑
export const pushPath = (pathConfig = {}) => {
  const query = getUrlParams()
  const currentId = query?.id
  // 当前路由已经存在了就不要操作了
  if (currentId === pathConfig.id) {
    return
  }
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
