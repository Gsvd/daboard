import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    rotation: false,
    username: '',
    rank: '',
    config: {},
    magnan: [],
    airport: [],
    trains: {
      stop_name: "",
      next: []
    },
    meteo: {
      city: "",
      data: []
    },
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
