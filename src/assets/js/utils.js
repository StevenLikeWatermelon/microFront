import router from '@/router'
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
