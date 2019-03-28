<template>
  <div class="content">
    <div class="block six columns">
      <div class="title">
        Create user
      </div>
      <div class="block-content" style="display: block;">
        <form v-on:submit.prevent="addUser">
          <div class="row">
            <div class="six columns">
              <label for="usernameInput">Username</label>
              <input class="u-full-width" type="text" placeholder="Xx-Sram-xX" id="usernameInput" v-model="user.username">
            </div>
            <div class="six columns">
              <label for="rankInput">Rank</label>
              <select class="u-full-width" id="rankInput" v-model="user.rank">
                <option disabled value="">Select</option>
                <option v-for="rank in ranks" :key="rank.id" :value="rank.id">{{ rank.label }}</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="twelve columns">
              <label for="passwordInput">Password</label>
              <input class="u-full-width" type="password" placeholder="******" id="passwordInput" v-model="user.password">
            </div>
          </div>
          <div class="row">
            <div class="twelve columns" style="text-align: center;">
              <input class="button-primary" type="submit" value="Create">
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="block six columns">
      <div class="title">
        Delete user
      </div>
      <div class="block-content">
        <button v-for="user in users" :key="user.id" class="button-primary" @click="deleteUser(user.id)">{{ user.username }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService'
import { showToast } from '@/utils/utils.js'
import { appenum } from '@/utils/enum.js'

export default {
  data: () => ({
    users: [],
    ranks: [],
    user: {
      username: null,
      rank: 2,
      password: null,
      hashed: null
    }
  }),
  created () {
    this.getUsers()
    this.getRanks()
  },
  methods: {
    async addUser () {
      if (this.user.username != null && this.user.rank != null && this.user.password != null) {
        const response = await AdminService.addUser(this.user)
        let success = response['data']['success']
        if (success) {
          showToast(appenum.CREATED, appenum.COLOR_SUCCESS)
          this.getUsers()
        } else {
          showToast(appenum.ACCESS_DENIED, appenum.COLOR_DANGER)
        }
      } else {
        showToast(appenum.INVALID_OPERATION, appenum.COLOR_DANGER)
      }
    },
    async getUsers () {
      AdminService.getUsers().then((response) => {
        this.users = response['data']
      })
    },
    async getRanks () {
      AdminService.getRanks().then((response) => {
        this.ranks = response['data']
      })
    },
    async deleteUser (id) {
      swal({
        title: `Delete user`,
        buttons: {
            cancel: 'Cancel',
            delete: {
                text: 'Delete',
                value: 'delete'
            },
        },
      }).then(async (value) => {
        if (value === 'delete') {
          const response = await AdminService.deleteUser(id)
          let success = response['data']['success']
          if (success) {
            showToast(appenum.DELETED, appenum.COLOR_SUCCESS)
            this.getUsers()
          } else {
            showToast(appenum.ACCESS_DENIED, appenum.COLOR_DANGER)
          }
        }
      })
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
      padding: 50px;
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
