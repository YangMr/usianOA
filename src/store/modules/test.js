const state = {
  list: []
}

const mutations = {
  CHANGE_LIST: (state, list) => {
    state.list = list
  }
}

const actions = {
  changeList({ commit }, data) {
    commit('CHANGE_LIST', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
