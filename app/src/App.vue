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
import config from '@/config/daboard.config.json'

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
      setInterval(() => {
        this.getMagnan()
        this.getAirport()
        this.getTrains()
      }, config.sncf.refresh_ms)
      setInterval(() => {
        this.getActuality()
      }, config.actuality.refresh_ms)
      setInterval(() => {
        this.refreshMeteo()
      }, config.weather.refresh_ms)
    },
    getMagnan () {
      TransportService.getCityway(config.cityway.stop_ids[0]).then((response) => {
        this.$store.state.magnan = response
      })
    },
    getAirport () {
      TransportService.getCityway(config.cityway.stop_ids[1]).then((response) => {
        this.$store.state.airport = response
      })
    },
    getTrains () {
      TransportService.getTrains().then((response) => {
        this.$store.state.trains.next = response
      })
      axios
      .get(process.env.VUE_APP_API_SNCF_URL.replace('{STOP_ID}', config.sncf.stop_id), {
        headers: {
          'Authorization': config.sncf.api_key
        }
      })
      .then((response) => {
        this.$store.state.trains.stop_name = response['data']['stop_areas'][0]["name"]
      })
    },
    getActuality () {
        axios
        .get(process.env.VUE_APP_API_ACTUALITY_URL.replace('{API_KEY}', config.actuality.api_key))
        .then((response) => {
          this.$store.state.actuality = response['data']['articles'].slice(0, 3)
        })
    },
    refreshMeteo () {
      axios
        .get(process.env.VUE_APP_API_WEATHER_URL.replace('{CITY_ID}', config.weather.city_id).replace('{API_KEY}', config.weather.api_key))
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

#app {
  display: flex;
  flex-flow: row;
}
</style>
