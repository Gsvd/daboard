<template>
  <div class="signin">
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
</template>

<script>
import { login } from '@/utils/security.js'
import { appenum } from '@/utils/enum.js'
import { showToast } from '@/utils/utils.js'

export default {
  name: 'AdminLogin',
  data: () => ({
    username: appenum.EMPTY,
    password: appenum.EMPTY,
    display: false
  }),
  methods: {
    async login () {
      let result = await login(this.username, this.password)
      if (result) {
        showToast(appenum.LOGGED_IN, appenum.COLOR_SUCCESS)
        this.$store.state.logged = result
        this.$store.state.username = localStorage.getItem('username')
        this.$store.state.rank = localStorage.getItem('rank')
        this.$router.push({ path: '/admin' })
      } else {
        showToast(appenum.INVALID_COMBINATION, appenum.COLOR_DANGER)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>

