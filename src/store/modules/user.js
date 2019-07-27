import { signinApi, signoutApi, meApi, usersApi, userApi } from '@/api/api'
import service from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERS: (state, users) => {
    state.users = users
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { usernameOrEmail, password } = userInfo
    return new Promise((resolve, reject) => {
      service.post(signinApi, { usernameOrEmail: usernameOrEmail.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  getUsers({ commit }, options) {
    return new Promise((resolve, reject) => {
      service.get(usersApi, {
        params: options
      }).then(response => {
        commit('SET_USERS', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      service.post(usersApi, user).then(response => {
        commit('SET_USERS', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteUser({ commit }, user) {
    const deleteUserApi = userApi.replace(':userId', user._id)
    return new Promise((resolve, reject) => {
      service.delete(deleteUserApi).then(response => {
        commit('SET_USERS', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      service.get(meApi).then(response => {
        if (!response) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_NAME', response.username)
        commit('SET_AVATAR', response.profileImageURL)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      service.get(signoutApi).then(response => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

