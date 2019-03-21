<template>
  <div class="content" v-if="display">
    <div class="frame">
      <div class="signin" v-if="!this.$store.state.logged">
        <div class="title">
          Signin
        </div>
        <div class="blockcontent">
          <form action="" method="POST" @submit.prevent="login">
            <div class="six columns form-group">
              <label for="usernameInput">Username</label>
              <input class="u-full-width inputform" type="text" placeholder="Xx-Sram-xX" id="usernameInput" v-model="username">
            </div>
            <div class="six columns">
              <label for="passwordInput">Password</label>
              <input class="u-full-width inputform" type="password" placeholder="*****" id="passwordInput" v-model="password">
            </div>
            <div class="twelve colmumns">
              <input class="button-primary inputform" type="submit" value="Submit">
            </div>
          </form>
        </div>
      </div>
      <div v-else-if="this.$store.state.logged && !getRouteAdminView().length" class="adminChoiceBlock">
        <router-link to="/admin/news">
          <div class="adminChoice" style="background: #1289A7">
            <div class="contentChoice">News</div>
          </div>
        </router-link>
      </div>
      <AdminNews v-if="this.$route.params.page === 'news'"/>
      <div class="twelve colmumns back" v-if="!getRouteAdminView().length && this.$store.state.logged">
          <input class="button inputform" type="button" @click="logout()" value="Logout">
      </div>
      <router-link to="/admin">
        <div class="twelve colmumns back" v-if="!!getRouteAdminView().length">
          <input class="button inputform" type="button" value="Back">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import AdminNews from '@/components/AdminNews.vue'
import AdminService from '@/services/AdminService'
import { login, logout } from '@/utils/security.js'
import { appenum } from '@/utils/enum.js'
import { showToast } from '@/utils/utils.js'

export default {
  name: 'admin',
  components: {
    AdminNews
  },
  data: () => ({
    username: appenum.EMPTY,
    password: appenum.EMPTY,
    display: false
  }),
  created () {
    if (!this.$store.state.logged && this.$route.params.page !== undefined) {
      document.location.href = '/admin'
    } else {
      this.display = true
    }
  },
  methods: {
    async login () {
      let result = await login(this.username, this.password)
      if (result) {
        showToast(appenum.LOGGED_IN, appenum.COLOR_SUCCESS)
        this.$store.state.logged = result
        this.$store.state.username = localStorage.getItem('username')
      } else {
        showToast(appenum.INVALID_COMBINATION, appenum.COLOR_DANGER)
      }
    },
    logout () {
      this.$store.state.logged = false
      this.$store.state.username = undefined
      logout()
      showToast(appenum.LOGGED_OUT, appenum.COLOR_SUCCESS)
    },
    getRouteAdminView () {
      if (this.$route.params.page === undefined)
        return appenum.EMPTY
      else
        return this.$route.params.page
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.content {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
}

.frame {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;

  .back {

    margin-top: 25px;

  }

  .signin {

    display: flex;
    min-height: 50vh;
    min-width: 480px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border-radius: 5px;
    flex-direction: column;
    padding: 15px;

    .title {

      font-size: 30px;
      text-align: center;

    }

    .blockcontent {

      flex-grow: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 15px;

      form {

        display: block;
        flex-grow: 1;

        .inputform {

          width: 100%;

        }

      }

    }

  }

  .adminChoiceBlock {

    display: flex;
    justify-content: center;
    align-items: center;

    .adminChoice {

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      height: 200px;
      width: 200px;
      border-radius: 5px;
      margin: 20px;

      .contentChoice {

        display: flex;
        color: white;
        font-size: 20px;
        font-family: "Roboto-Bold";

      }

    }

  }

}
</style>
