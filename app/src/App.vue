<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { connectByToken, logout } from '@/utils/security.js'
import TransportService from '@/services/TransportService'

export default {
  name: 'App',
  mounted () {
    this.startServices()
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
    },
    startServices () {
      this.getMagnan()
      this.getAirport()
      this.getTrains()
      setInterval(() => {
        this.getMagnan()
        this.getAirport()
        this.getTrains()
      }, 30000)
    },
    getMagnan () {
      TransportService.getLigneAzur(32256).then((response) => {
        this.$store.state.magnan = response
      })
    },
    getAirport () {
      TransportService.getLigneAzur(32253).then((response) => {
        this.$store.state.airport = response
      })
    },
    getTrains () {
      TransportService.getTrains().then((response) => {
        this.$store.state.trains = response
      })
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
