<template>
  <div id="app">
    <Navbar v-if="!this.$route.path.includes('error')"/>
    <router-view/>
  </div>
</template>

<script>
import { connectByToken, logout } from '@/utils/security.js'
import TransportService from '@/services/TransportService'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  mounted () {
    this.startServices()
  },
  methods: {
    startServices () {
      this.getMagnan()
      this.getAirport()
      this.getTrains()
      setInterval(() => {
        this.getMagnan()
        this.getAirport()
        this.getTrains()
      }, 60000)
    },
    getMagnan () {
      TransportService.getLigneAzur(32253).then((response) => {
        this.$store.state.magnan = response
      })
    },
    getAirport () {
      TransportService.getLigneAzur(32256).then((response) => {
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
.icon {
  width: 20px;
  margin: 0 2px 0 2px;
}
#app {
  display: flex;
  flex-flow: row;
}
</style>
