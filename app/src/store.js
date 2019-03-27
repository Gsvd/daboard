import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    rotation: false,
    timeRotation: 15000,
    username: '',
    rank: '',
    magnan: [],
    airport: [],
    trains: [],
    meteo: [],
    actuality: []
  },
  mutations: {
    toggleRotation (state, status) {
      state.rotation = status
    }
  },
  getters: {
    isAdmin: (state) => {
      return Number(state.rank) === 1
    }
  }
})
