import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'j"Vc8]/@!-(U8W#',
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
