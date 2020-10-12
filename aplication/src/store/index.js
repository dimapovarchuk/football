import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notification: {
      status: '',
      text: ''
    },
    token: '',
    user_type: '',
    culture_key: 'uk',
    list: '',
    item: '',
    selected_stuff: {}
  },
  mutations: {
    setSelectedStuff (state, payload) {
      state.selected_stuff = payload
    },
    pushList (state, payload) {
      state.list = payload
    },
    pushNotification (state, payload) {
      state.notification = payload
      setTimeout(() => {
        state.notification = {
          status: '',
          text: ''
        }
      }, 2000)
    },
    setLang (state, lang) {
      state.culture_key = lang
    },
    setToken (state, payload) {
      state.token = payload.token
    },
    deleteToken (state) {
      state.token = ''
      window.localStorage.removeItem('token')
    },
    deleteTeam (state) {
      state.item = ''
      window.localStorage.removeItem('item')
    },
    userTypeUpdate (state, type) {
      state.user_type = type
      window.localStorage.setItem('user_type', type)
    }
  },
  actions: {
    setStuff ({ commit }, payload) {
      commit('setSelectedStuff', payload)
    },
    pushList ({ commit }, payload) {
      commit('pushList', payload)
    },
    pushNotification ({ commit }, payload) {
      commit('pushNotification', payload)
    },
    setLang ({ commit }, lang) {
      commit('setLang', lang)
    },
    deleteTeam ({ commit }, lang) {
      commit('deleteTeam', lang)
    },
    setUserType ({ commit }, userType) {
      commit('userTypeUpdate', userType)
    },
    logout (context) {
      context.commit('userTypeUpdate', '')
      context.commit('deleteToken')
    },
    checkToken ({ commit }) {
      let token = window.localStorage.getItem('token')
      let type = window.localStorage.getItem('user_type')
      if (token) {
        commit('setToken', { token: token })
      }
      if (type) {
        commit('userTypeUpdate', type)
      }
    }
  },
  modules: {
  }
})
