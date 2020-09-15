import { getMenu, getSysList } from '@/api/menu'

const state = {
  // 左侧菜单项
  menuList: [],
  //   系统的code码用来匹配前缀url
  sysCodeConfig: []
}

const mutations = {
  setMenu (state, menuList) {
    state.menuList = menuList
  },
  setSysCode (state, sysCodeConfig) {
    state.sysCodeConfig = sysCodeConfig
  }
}

const actions = {
  getMenu ({ commit }) {
    return new Promise((resolve, reject) => {
      getMenu().then(res => {
        console.log(res)
        const menuList = res.result || []
        commit('setMenu', menuList)
        resolve(menuList)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getSysList ({ commit }) {
    return new Promise((resolve, reject) => {
      getSysList().then(res => {
        const sysCodeConfig = res.result || []
        commit('setSysCode', sysCodeConfig)
        resolve(sysCodeConfig)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
