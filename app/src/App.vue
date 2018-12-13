<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { connectByToken, logout } from '@/utils/security.js'

export default {
  name: 'App',
  mounted () {
    this.connectByToken()
  },
  methods: {
    async connectByToken () {
      const id = localStorage.getItem('id')
      const token = localStorage.getItem('token')
      if (id && token) {
        let connected = await connectByToken(id, token)
        if (connected) {
          this.$store.state.logged = connected
          this.$store.state.username = localStorage.getItem('username')
        }
      }
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Roboto";
  src: url("assets/fonts/Roboto-Regular.ttf");
}
@font-face {
  font-family: "Roboto-Bold";
  src: url("assets/fonts/Roboto-Bold.ttf");
}
@font-face {
  font-family: "Roboto-Thin";
  src: url("assets/fonts/Roboto-Thin.ttf");
}
@font-face {
  font-family: "Roboto-Light";
  src: url("assets/fonts/Roboto-Light.ttf");
}
</style>
