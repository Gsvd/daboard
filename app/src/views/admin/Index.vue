<template>
  <div class="content">
    <div class="frame">
      <router-view/>
      <div class="twelve colmumns back" v-if="this.$store.state.logged && this.$route.path !== '/admin/login' && this.$route.path === '/admin'">
        <input class="button inputform" type="button" @click="logoutClick" value="Logout">
      </div>
      <router-link to="/admin" v-if="this.$route.path !== '/admin' && this.$route.path !== '/admin/login'">
        <div class="twelve colmumns back">
          <input class="button inputform" type="button" value="Back">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService'
import { logout } from '@/utils/security.js'
import { showToast } from '@/utils/utils.js'

export default {
  name: 'Admin',
  methods: {
    logoutClick () {
      logout()
      this.$store.state.logged = false
      this.$store.state.username = undefined
      this.$router.push({ path: '/admin/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
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
}
</style>
