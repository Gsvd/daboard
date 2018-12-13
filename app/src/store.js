import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    rotation: false,
    timeRotation: 5000,
    username: ''
  },
  mutations: {
    toggleRotation (state, status) {
      state.rotation = status
    }
  },
  actions: {

  }
})
