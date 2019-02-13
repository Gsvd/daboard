<template>
  <div class="content">
    <Navbar/>
    <div class="frame">
      <div class="schedule-content">
        <div class="schedule-block">
          <div class="schedule-title">TRAM L2 Parc Phoenix</div>
          <div class="content-block">
            <div class="side">
              <div class="title-home">Magnan</div>
              <div class="entry">
                <ul>
                  <li v-if="this.$store.state.magnan.length <= 0"><img src="../assets/images/meh.svg" class="icon"></li>
                  <li v-for="(tram, index) in this.$store.state.magnan" :key="index" v-if="tram[1] > 0">{{ tram[1] }} minute{{ tram[1] > 1 ? 's' : '' }}</li>
                  <li v-else>Imminent</li> 
                </ul>
              </div>
            </div>
            <div class="side">
              <div class="title-home">Aéroport</div>
              <div class="entry">
                <ul>
                  <li v-if="this.$store.state.airport.length <= 0"><img src="../assets/images/meh.svg" class="icon"></li>
                  <li v-for="(tram, index) in this.$store.state.airport" :key="index" v-if="tram[1] > 0">{{ tram[1] }} minute{{ tram[1] > 1 ? 's' : '' }}</li>
                  <li v-else>Imminent</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="schedule-block">
          <div class="schedule-title">SNCF Saint Augustin</div>
          <div class="content-block">
            <div class="side">
              <div class="entry">
                <table class="u-full-width">
                  <thead>
                    <tr>
                      <td class="title-home">Direction</td>
                      <td class="title-home">Arrivée</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="this.$store.state.trains.length <= 0">
                      <td><img src="../assets/images/meh.svg" class="icon"></td>
                      <td><img src="../assets/images/meh.svg" class="icon"></td>
                    </tr>
                    <tr v-else v-for="(train, index) in this.$store.state.trains" :key="index">
                      <td>{{ train[0] }}</td>
                      <td>{{ train[1] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbar
  },
  mounted () {
    if (this.$route.path === '/start') {
      this.$store.commit('toggleRotation', true)
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
.title-home {

  text-align: center;
  font-size: 15px;
  padding: 12px 15px;
  font-family: 'Roboto-Bold';

}

.content {

  display: flex;
  flex-direction: row;
  height: 100vh;

  .frame {
    
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    padding: 15px;
    background: rgb(253, 253, 253);
    overflow-y: auto;

    .schedule-content {

      display: flex;
      flex-direction: row;

      .schedule-block {

        display: flex;
        margin: 15px;
        font-family: 'Roboto-Light';
        width: 33%;
        flex-direction: column;
        border: 1px #ecf0f1 solid;
        border-radius: 5px;

        .schedule-title {

          text-align: center;
          font-size: 30px;
          text-align: center;
          border-bottom: 2px #ecf0f1 solid;

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

              table {

                table-layout: fixed;

                tr {

                  td {

                    border: none;
                    text-align: center;
                    font-size: 15px;

                  }

                }

              }

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
