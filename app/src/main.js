import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { autoAuthentication } from './utils/security'

Vue.config.productionTip = false

autoAuthentication().then(() => {
  new Vue({
    router,
    store,
    watch: {
      '$route' (to, from) {
        if (this.$store.state.rotation) {
          switch (to.path) {
            case '/':
              var interval = setTimeout(() => this.$router.push({ path: '/news' }), this.$store.state.timeRotation)
              break
            case '/news':
              var interval = setTimeout(() => this.$router.push({ path: '/scheduler' }), this.$store.state.timeRotation)
              break
            case '/scheduler':
              var interval = setTimeout(() => this.$router.push({ path: '/' }), this.$store.state.timeRotation)
              break
          }
        }
      }
    },
    render: h => h(App)
  }).$mount('#app')
})
