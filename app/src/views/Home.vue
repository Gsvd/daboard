<template>
  <div class="content">
    <Navbar/>
    <div class="frame">
      <div class="tramway-block">
        <div class="tramway-title">L2 Parc Phoenix</div>
        <div class="content-block">
          <div class="side">
            <div class="title">Magnan</div>
            <div class="entry">
              <ul>
                <li v-for="minute in this.$store.state.magnan" :key="minute" v-if="minute > 0">{{ minute }} minute{{ minute > 1 ? 's' : '' }}</li>
                <li v-else>Imminent</li> 
              </ul>
            </div>
          </div>
          <div class="side">
            <div class="title">Aéroport</div>
            <div class="entry">
              <ul>
                <li v-for="minute in this.$store.state.airport" :key="minute" v-if="minute > 0">{{ minute }} minute{{ minute > 1 ? 's' : '' }}</li>
                <li v-else>Imminent</li>
              </ul>
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

    .tramway-block {

      display: flex;
      font-family: 'Roboto-Light';
      width: 33%;
      flex-direction: column;
      border: 1px #ecf0f1 solid;
      border-radius: 5px;

      .tramway-title {

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

          .title {

            text-align: center;
            font-size: 20px;
            margin-bottom: 10px;

          }

          .entry {

            font-size: 15px;

            ul {

              text-align: center;
              list-style: none;

              li {

                &:first-child {

                  font-family: 'Roboto-Bold';

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
