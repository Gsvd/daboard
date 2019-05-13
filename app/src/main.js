import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { loadConfiguration } from '@/utils/utils.js'
import { autoAuthentication } from './utils/security'

Vue.config.productionTip = false

autoAuthentication().then(() => {
  new Vue({
    router,
    store,
    watch: {
      '$route' (to, from) {
        if (this.$store.state.rotation) {
          loadConfiguration().then(() => {
            switch (to.path) {
              case '/':
                var interval = setTimeout(() => this.$router.push({ path: '/news' }), this.$store.state.config.misc.rotation_ms)
                break
              case '/news':
                var interval = setTimeout(() => this.$router.push({ path: '/' }), this.$store.state.config.misc.rotation_ms)
                break
              /* case '/scheduler':
                var interval = setTimeout(() => this.$router.push({ path: '/' }), this.$store.state.config.misc.rotation_ms)
                break */
            }
          })
        }
      }
    },
    render: h => h(App)
  }).$mount('#app')
})
