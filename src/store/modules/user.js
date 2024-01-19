import { setToken, getToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken()
}

// const getters = {
//   token: (state) => state.token
// }

const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  }
}

const actions = {
  login(context, payload) {
    context.commit('setToken', '123456')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
