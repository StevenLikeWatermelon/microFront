import { request } from 'xl-utils'
import { Message } from 'xl-views'
import { TokenKey } from '@/assets/js/storeToken'
import { showTokenExpireBox } from '@/assets/js/utils'

const axiosInstance = request({
  TOKEN_KEY: TokenKey,
  baseUrl: process.env.VUE_APP_BASE_API
})

// 二次封装
const service = (config = {}) => {
  return new Promise((resolve, reject) => {
    axiosInstance(config).then(res => {
      resolve(res)
    }).catch(err => {
      // 首先所有的错误都报个错
      Message({
        message: err.errMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 如果是token失效做统一的路由回到login处理 错误码暂时写死的401，因为后端还没定 后期需要改
      if (err.messageCode === '401') {
        showTokenExpireBox()
      }
      reject(err)
    })
  })
}
export default service
