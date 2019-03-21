<template>
  <div class="content">
    <div class="frame">
      <div class="block-content">
        <div class="item-block">
          <div class="item-title">TRAM L2 Parc Phoenix</div>
          <div class="content-block">
            <div class="side">
              <div class="entry">
                <table>
                  <thead>
                    <tr>
                      <td class="title-home">Magnan</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="this.$store.state.magnan.length <= 0">
                      <td><img src="@/assets/images/meh.svg" class="icon"></td>
                    </tr>
                    <tr v-else v-for="(tram, index) in this.$store.state.magnan" :key="index">
                      <td v-if="tram[1] > 0">{{ tram[1] }} minutes</td>
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
                      <td class="title-home">Aéroport</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="this.$store.state.airport.length <= 0">
                      <td><img src="@/assets/images/meh.svg" class="icon"></td>
                    </tr>
                    <tr v-else v-for="(tram, index) in this.$store.state.airport" :key="index">
                      <td v-if="tram[1] > 0">{{ tram[1] }} minutes</td>
                      <td v-else>Imminent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="item-block">
          <div class="item-title">SNCF Saint Augustin</div>
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
                      <td><img src="@/assets/images/meh.svg" class="icon"></td>
                      <td><img src="@/assets/images/meh.svg" class="icon"></td>
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
  width: 100%;

  .frame {
    
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    overflow-y: auto;

    .block-content {

      display: flex;
      flex-flow: row wrap;

      .item-block {

        display: flex;
        margin: 15px;
        font-family: 'Roboto-Light';
        flex-direction: column;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
        border-radius: 5px;
        padding: 5px 25px 5px 25px;
        flex-grow: 1;

        .item-title {

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
