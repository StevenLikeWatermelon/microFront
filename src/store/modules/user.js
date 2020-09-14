import { login, logout, getInfo } from '@/api/user'

import { getToken, setToken, removeToken } from '@/assets/js/localStorage'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  userId: ''
}

const mutations = {
  SET_TOKEN (state, token) {
    // 本地化存储
    setToken(token)
    state.token = token
  },
  REMOVE_TOKEN (state) {
    removeToken()
    state.token = ''
  },
  SET_NAME (state, name) {
    state.name = name
  },
  SET_AVATAR (state, avatar) {
    state.avatar = avatar
  }
}

const actions = {
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), passWord: password, sysId: 102 }).then(res => {
        const token = res.result && res.result.token
        commit('SET_TOKEN', token)
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
        commit('SET_NAME', userInfo.name)
        commit('SET_AVATAR', userInfo.avatar)
        resolve(userInfo)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('REMOVE_TOKEN')
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
