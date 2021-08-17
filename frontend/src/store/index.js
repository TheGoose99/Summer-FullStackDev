import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setAuthentication (state, status) {
      state.authenticated = status
    },
    clearAuthentication (state) {
      state.authenticated = false
    }
  },
  actions: {
    clearAuthUser: ({ commit }) => {
      commit('clearAuthentication')
    },
    async attempt ({ commit }, token) {
      commit('SET_TOKEN', token)
    }
  },
  modules: {
    auth
  }
})
