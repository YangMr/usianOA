import { setToken, getToken, removeToken } from '@/utils/auth'
import { loginApi, getProfileApi } from '@/api/user'
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'
const state = {
  token: getToken(),
  userInfo: {},
  // 路由会转化成菜单
  routes: constantRoutes
}

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
  },
  // 设置user
  setUser(state, user) {
    state.userInfo = user
  },
  // 设置路由
  setRoutes(state, newRoutes) {
    state.routes = [...state.routes, ...newRoutes]
  }
}

const actions = {
  // 登录方法
  async login(context, payload) {
    delete payload.isAgree
    const token = await loginApi(payload)
    context.commit('setToken', token)
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const res = await getProfileApi()
    console.log('res=>', res)
    commit('setUser', res)
    return res
  },
  // 退出登录
  logout(context) {
    // 清除token
    context.commit('removeToken')
    // 清除用户信息
    context.commit('setUser', {})
    // 重置路由
    resetRouter()
    // 重置菜单数据
    context.state.routes = constantRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
