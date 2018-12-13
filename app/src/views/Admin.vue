<template>
  <div class="content" v-if="display">
    <Navbar/>
    <div class="frame">
      <div class="signin" v-if="!this.$store.state.logged" :class="{ 'empty': atLeastOneError }">
        <div class="title">
          Signin
        </div>
        <div class="blockcontent">
          <form action="" method="POST" @submit.prevent="submitSignin">
            <div class="six columns form-group">
              <label for="usernameInput" :class="{ 'text-danger': this.errors.username }">Username</label>
              <input class="u-full-width inputform" :class="{ 'has-error': this.errors.username }" type="text" placeholder="Xx-Sram-xX" id="usernameInput" v-model="username">
            </div>
            <div class="six columns">
              <label for="passwordInput" :class="{ 'text-danger': this.errors.username }">Password</label>
              <input class="u-full-width inputform" :class="{ 'has-error': this.errors.username }" type="password" placeholder="*****" id="passwordInput" v-model="password">
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
        <router-link to="/admin">
          <div class="adminChoice" style="background: #ED4C67">
            <div class="contentChoice">TEST</div>
          </div>
        </router-link>
        <router-link to="/admin">
          <div class="adminChoice" style="background: #FFC312">
            <div class="contentChoice">TEST</div>
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
import Navbar from '@/components/Navbar.vue'
import AdminNews from '@/components/AdminNews.vue'
import AdminService from '@/services/AdminService'
import { appenum } from '@/enum.js'
import { showToast } from '@/security.js'

export default {
  name: 'admin',
  components: {
    Navbar,
    AdminNews
  },
  data: () => ({
    username: '',
    password: '',
    targetChoice: '',
    display: false,
    atLeastOneError: false,
    errors: {
      'username': '',
      'password': ''
    }
  }),
  created () {
    if (!this.$store.state.logged && this.$route.params.page !== undefined) {
      document.location.href = '/admin'
    } else {
      this.display = true
    }
  },
  methods: {
    async submitSignin () {
      const response = await AdminService.signin({ username: this.username, password: this.password })
      let success = response['data']['success']
      let answer = response['data']['answer']
      if (success) {
        this.$store.state.logged = true
        this.$store.state.username = answer.username
        showToast(appenum.LOGGED_IN, appenum.COLOR_SUCCESS)
      } else {
        this.errors.username = answer.username
        this.errors.password = answer.password
        this.atLeastOneError = true
        showToast(appenum.INVALID_OPERATION, appenum.COLOR_DANGER)
      }
    },
    target (choice) {
      console.log(choice)
      this.targetChoice = choice
      console.log(this.targetChoice)
    },
    logout () {
      this.$store.state.logged = false
      this.$store.state.username = ''
      showToast(appenum.LOGGED_OUT, appenum.COLOR_WARNING)
    },
    getRouteAdminView () {
      if (this.$route.params.page === undefined)
        return ''
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
.frame {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .back {

    margin-top: 25px;

  }

  .signin {

    display: flex;
    min-height: 50vh;
    background: white;
    min-width: 480px;
    border: 1px #ecf0f1 solid;
    border-radius: 5px;
    flex-direction: column;

    .title {

      font-size: 30px;
      text-align: center;
      border-bottom: 2px #ecf0f1 solid;

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
