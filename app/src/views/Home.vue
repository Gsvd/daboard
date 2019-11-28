<template>
  <div class="content">
    <div class="frame">
      <div class="block-content">
        <div class="item-block">
          <div class="item-title">TRAM L2</div>
          <div class="content-block">
            <div class="side">
              <div class="entry">
                <table>
                  <thead>
                    <tr>
                      <td class="title-home">Port Lympia</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="this.$store.state.magnan.length <= 0">
                      <td><img src="@/assets/images/meh.svg" class="icon"></td>
                    </tr>
                    <tr v-else v-for="(tram, index) in this.$store.state.magnan" :key="index">
                      <td v-if="tram[1] > 0">{{ tram[1] }} {{ getMinutePluralOrSingular(tram[1]) }}</td>
                      <td v-else>Imminent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="side">
              <div class="entry">
                <table>
                  <thead>
                    <tr>
                      <td class="title-home"><span class="direction-0">Aéroport</span> / <span class="direction-1">CADAM</span></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="this.$store.state.airport.length <= 0">
                      <td><img src="@/assets/images/meh.svg" class="icon"></td>
                    </tr>
                    <tr v-else v-for="(tram, index) in this.$store.state.airport" :key="index">
                      <td v-if="tram[1] > 0" v-bind:class="directionObject(tram[2])">{{ tram[1] }} {{ getMinutePluralOrSingular(tram[1]) }}</td>
                      <td v-else  v-bind:class="directionObject(tram[2])">Imminent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title">{{ this.$store.state.trains.stop_name || "Undefined" }}</div>
          <div class="content-block">
            <div class="side">
              <div class="entry">
                <table class="u-full-width">
                  <thead>
                    <tr>
                      <td class="title-home">Direction</td>
                      <td class="title-home">Arrival</td>
                      <td class="title-home">Delay</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="this.$store.state.trains.next.length <= 0">
                      <td><img src="@/assets/images/meh.svg" class="icon"></td>
                      <td><img src="@/assets/images/meh.svg" class="icon"></td>
                    </tr>
                    <tr v-else v-for="(train, index) in this.$store.state.trains.next" :key="index">
                      <td>{{ train[0] }}</td>
                      <td v-if="train[2] > 0"><strike>{{ train[1] }}</strike> - {{ train[3] }}</td>
                      <td v-else>{{ train[1] }}</td>
                      <td v-if="train[2] > 0">{{ train[2] }} {{ getMinutePluralOrSingular(train[2]) }}</td>
                      <td v-else>On time</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title">{{ this.$store.state.meteo.city || "Undefined" }}</div>
          <div class="meteo" v-for="element in this.$store.state.meteo.data" :key="element.dt">
            <div class="date">
              {{ element.dt_txt.slice(11) }}
            </div>
            <div class="temperature">
              <div><img class="icon-meteo" :src="'/images/meteo/' + getThermometerByTemperature(element['main'].temp)"></div>
              <div>{{ Number(element['main'].temp).toFixed(1) }} °C</div>
              <div><img class="icon-meteo" :src="'/images/meteo/' + element['weather'][0].icon + '.svg'"></div>
              <div>{{ (Number(element['wind'].speed)* 3.6).toFixed(1) }} km/h</div>
              <div><img class="icon-meteo" src="/images/meteo/windy.svg"></div>
            </div>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title">Actuality</div>
          <div class="actuality-block">
            <div class="actuality-element" v-for="actuality in this.$store.state.actuality" :key="actuality.publishedAt">
              <div class="actuality-title">{{ actuality.title }}</div>
              <div class="actuality-description">{{ actuality.description }}</div>
              <div class="actuality-readmore"><a :href="actuality.url" target="_blank">{{ actuality.url }}</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appenum } from '@/utils/enum.js'
import { updateAvailable } from '@/utils/utils.js'

export default {
  name: 'home',
  data: () => ({
    meteo: null
  }),
  mounted () {
    updateAvailable()
    if (this.$route.path === '/start') {
      this.$store.commit('toggleRotation', true)
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    directionObject: function (id) {
      return {
        'direction-0': id == appenum.TRAM_AIRPORT,
        'direction-1': id == appenum.TRAM_CADAM
      }
    },
    getThermometerByTemperature (temperature) {
      if (temperature < 10) {
        return appenum.THERMOMETER_COLD
      } else if (temperature < 25) {
        return appenum.THERMOMETER_MEDIUM
      } else {
        return appenum.THERMOMETER_HOT
      }
    },
    getMinutePluralOrSingular (duration) {
      return duration > 1 ? 'minutes' : 'minute'
    }
  }
}
</script>

<style lang="scss">
.direction-0 {
  color: #e74c3c;
}

.direction-1 {
  color: #3498db;
}

.title-home {

  text-align: center;
  font-size: 15px;
  padding: 12px 15px;
  font-family: 'Roboto-Bold';

}

.actuality-block {
  display: flex;
  flex-flow: row wrap;
  .actuality-element {
    flex: 1 1 0;
    padding: 15px;
    .actuality-title {
      font-size: 17px;
      font-family: Roboto-Bold;
    }
    .actuality-description {
      margin-top: 20px;
      font-size: 15px;
      font-family: Roboto;
      text-align: justify;
    }
    .actuality-readmore {
      margin-top: 25px;
      font-family: Roboto-Light;
      font-size: 12px;
    }
  }
}

.icon-meteo {
  width: 30px;
}

table {

  width: 100%;
  margin: 0;

  tr {

    td {

      border: none;
      text-align: center;
      font-size: 15px;

    }

  }

}

.content {

  display: flex;
  flex-direction: row;
  align-content: center;
  height: 100vh;
  width: 100%;

  .frame {
    
    flex-grow: 1;
    flex-direction: column;
    display: flex;

    .block-content {

      display: flex;
      flex-flow: row wrap;

      .item-block {

        display: flex;
        flex: 1 0 21%;
        margin: 15px;
        font-family: 'Roboto-Light';
        flex-direction: column;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        border-radius: 5px;
        padding: 5px 25px 5px 25px;
        flex-grow: 1;

        .item-title {

          text-align: center;
          font-size: 30px;
          text-align: center;

        }

        .meteo {
          margin-top: 25px;
          .date {
            font-family: Roboto-Bold;
            font-size: 15px;
          }
          .temperature {
            text-align: center;
            margin-top: 10px;
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            align-items: center;
          }
          .temperature > * {
            margin: 10px;
          }
        }

        .content-block {

          display: flex;
          flex-direction: row;

          .side {

            display: flex;
            flex-grow: 1;
            flex-direction: column;
            padding: 17px;

            .entry {

              font-size: 15px;

              .text-left {

                text-align: left;

              }

              ul {

                text-align: center;
                list-style: none;

                li {

                  margin: 0;
                  padding: 12px 15px;
                  font-size: 15px;
                  
                }

              }

            }

          }

        }

      }

    }

    .has-error {

      border-color: red;

    }

    .text-danger {

      color: red;

    }

  }

}
</style>
