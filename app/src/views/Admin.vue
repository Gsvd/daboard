<template>
  <div class="content">
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
              <p class="text-danger">{{ this.errors.username }}</p>
            </div>
            <div class="six columns">
              <label for="passwordInput" :class="{ 'text-danger': this.errors.username }">Password</label>
              <input class="u-full-width inputform" :class="{ 'has-error': this.errors.username }" type="password" placeholder="*****" id="passwordInput" v-model="password">
              <p class="text-danger">{{ this.errors.password }}</p>
            </div>
            <div class="twelve colmumns">
              <input class="button-primary inputform" type="submit" value="Submit">
            </div>
          </form>
        </div>
      </div>
      <AdminNews v-else/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AdminNews from '@/components/AdminNews.vue'
import AdminService from '@/services/AdminService'

export default {
  name: 'admin',
  components: {
    Navbar,
    AdminNews
  },
  data: () => ({
    username: '',
    password: '',
    atLeastOneError: false,
    errors: {
      'username': '',
      'password': ''
    }
  }),
  methods: {
    async submitSignin () {
      const response = await AdminService.signin({ username: this.username, password: this.password })
      let success = response['data']['success']
      let answer = response['data']['answer']
      if (success) {
        this.$store.state.logged = true
        this.$store.state.username = answer.username
      } else {
        this.errors.username = answer.username
        this.errors.password = answer.password
        this.atLeastOneError = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.frame {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

}
</style>
