import { request } from 'xl-utils'
import { Message } from 'xl-views'
import { TokenKey } from '@/assets/js/localStorage.js'

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
      // console.log(err); 预留二次处理逻辑的空间
      Message({
        message: err.errMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      reject(err)
    })
  })
}
export default service
