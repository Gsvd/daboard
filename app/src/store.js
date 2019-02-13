import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    rotation: false,
    timeRotation: 30000,
    username: '',
    magnan: [],
    airport: []
  },
  mutations: {
    toggleRotation (state, status) {
      state.rotation = status
    }
  },
  actions: {

  }
})
