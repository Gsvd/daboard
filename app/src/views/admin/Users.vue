<template>
  <div class="content">
    <div class="block six columns">
      <div class="title">
        Create user
      </div>
      <div class="block-content">
        Work in progress.
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
    users: []
  })  ,
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      AdminService.getUsers().then((response) => {
        this.users = response['data']
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
          console.log(success)
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
