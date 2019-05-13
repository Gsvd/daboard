<template>
  <div class="content">
    <div class="block three columns">
      <div class="title">
        Trains
      </div>
      <div class="block-content" style="display: block;">
        <form method="POST" @submit.prevent="updateConfiguration">
          <div class="row">
            <div class="twelve columns">
              <label for="trainsAPIKeyInput">API Key</label>
              <input class="u-full-width" type="text" id="trainsAPIKey" v-model="config.sncf.api_key">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns">
              <label for="trainsStopIDInput">Stop ID</label>
              <input class="u-full-width" type="text" id="trainsStopID" v-model="config.sncf.stop_id">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns">
              <label for="trainsRefreshInput">Refresh (ms)</label>
              <input class="u-full-width" type="number" id="trainsRefresh" v-model="config.sncf.refresh_ms">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns" style="text-align: center;">
              <input class="button-primary" type="submit" value="Update">
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="block three columns">
      <div class="title">
        Weather
      </div>
      <div class="block-content" style="display: block;">
        <form method="POST" @submit.prevent="updateConfiguration">
          <div class="row">
            <div class="twelve columns">
              <label for="weatherAPIKeyInput">API Key</label>
              <input class="u-full-width" type="text" id="weatherAPIKey" v-model="config.weather.api_key">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns">
              <label for="weatherCityIDInput">City ID</label>
              <input class="u-full-width" type="text" id="weatherCityID" v-model="config.weather.city_id">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns">
              <label for="weatherRefreshInput">Refresh (ms)</label>
              <input class="u-full-width" type="number" id="weatherRefresh" v-model="config.weather.refresh_ms">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns" style="text-align: center;">
              <input class="button-primary" type="submit" value="Update">
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="block three columns">
      <div class="title">
        Actuality
      </div>
      <div class="block-content" style="display: block;">
        <form method="POST" @submit.prevent="updateConfiguration">
          <div class="row">
            <div class="twelve columns">
              <label for="actualityAPIKeyInput">API Key</label>
              <input class="u-full-width" type="text" id="actualityAPIKey" v-model="config.actuality.api_key">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns">
              <label for="actualityRefreshInput">Refresh (ms)</label>
              <input class="u-full-width" type="number" id="actualityRefresh" v-model="config.actuality.refresh_ms">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns" style="text-align: center;">
              <input class="button-primary" type="submit" value="Update">
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="block three columns">
      <div class="title">
        Misc
      </div>
      <div class="block-content" style="display: block;">
        <form method="POST" @submit.prevent="updateConfiguration">
          <div class="row">
            <div class="twelve columns">
              <label for="miscRotationInput">Rotation (ms)</label>
              <input class="u-full-width" type="number" id="miscRotation" v-model="config.misc.rotation_ms">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns" style="text-align: center;">
              <input class="button-primary" type="submit" value="Update">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { loadConfiguration } from '@/utils/utils.js'
import AdminService from '@/services/AdminService'
import { showToast } from '@/utils/utils.js'
import { appenum } from '@/utils/enum.js'

export default {
  computed: {
    config: {
      get () {
        return this.$store.state.config
      },
      set (value) {
        this.$store.commit('updateConfig', value)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    loadConfiguration().then(() => {
      next()
    })
  },
  methods: {
    async updateConfiguration () {
      let response = await AdminService.setConfiguration(this.config)
      let success = response.data.success
      if (success) {
        showToast(appenum.UPDATED, appenum.COLOR_SUCCESS)
        loadConfiguration()
      } else {
        showToast(appenum.INVALID_OPERATION, appenum.COLOR_DANGER)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  .block {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    min-height: 50vh;
    padding: 10px;
    border-radius: 5px;
    .title {
      font-size: 30px;
      text-align: center;
    }
    .block-content {
      padding: 10px;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      button {
        margin: 5px;
      }
    }
  }
}
</style>
