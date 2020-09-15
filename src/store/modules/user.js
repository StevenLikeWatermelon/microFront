import { login, logout, getInfo } from '@/api/user'

import { getToken, setToken, removeToken } from '@/assets/js/storeToken'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userId: ''
}

const mutations = {
  setToken (state, token) {
    // 本地化存储
    setToken(token)
    state.token = token
  },
  removeToken (state) {
    removeToken()
    state.token = ''
  },
  setName (state, name) {
    state.name = name
  },
  setAvatar (state, avatar) {
    state.avatar = avatar
  }
}

const actions = {
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), passWord: password, sysId: 102 }).then(res => {
        const token = res.result && res.result.token
        commit('setToken', token)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const userInfo = res.result || {}
        commit('setName', userInfo.name)
        commit('setAvatar', userInfo.avatar)
        resolve(userInfo)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('removeToken')
        resolve()
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
