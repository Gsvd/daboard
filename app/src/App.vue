<template>
  <div id="app">
    <Navbar v-if="!this.$route.path.includes('error')"/>
    <router-view style="margin-left: 200px;"/>
  </div>
</template>

<script>
import { connectByToken, logout } from '@/utils/security.js'
import TransportService from '@/services/TransportService'
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

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
      this.refreshMeteo()
      this.getActuality()
      //EVERY MINUTE
      setInterval(() => {
        this.getMagnan()
        this.getAirport()
        this.getTrains()
      }, 60000)
      //5 MINUTES
      setInterval(() => {
        this.getActuality()
      }, 300000)
      //30 MINUTES
      setInterval(() => {
        this.refreshMeteo()
      }, 1800000)
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
    },
    getActuality () {
        axios
        .get('//newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=78c2df573fb3413ea5651bffcbe9a52e')
        .then((response) => {
          this.$store.state.actuality = response['data']['articles'].slice(0, 3)
        })
    },
    refreshMeteo () {
      axios
        .get('//api.openweathermap.org/data/2.5/forecast?id=6454924&appid=075bf16ec302d49fd9586cbd8b0b476c&units=metric')
        .then((response) => {
          this.$store.state.meteo = response['data']['list'].slice(0, 4)
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
