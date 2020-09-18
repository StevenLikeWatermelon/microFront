
const actions = {
  getAllUserInfo ({ dispatch }) {
    //   同时处理userInfo menuInfo和sysCodeInfo
    return new Promise((resolve, reject) => {
      Promise.all([dispatch('menu/getMenu'), dispatch('menu/getSysList')]).then((values) => {
        resolve(values)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default actions
