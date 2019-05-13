<template>
  <div>
    <div class="title">{{ this.greeting }},&nbsp;{{ `${ this.$store.state.username } (${ rank })` }}</div>
    <div class="adminChoiceBlock">
      <router-link to="/admin/news" class="adminChoice" style="background: #1289A7">
        <div class="contentChoice">News</div>
      </router-link>
      <router-link to="/admin/users" class="adminChoice" style="background: #feca57" v-if="this.$store.getters.isAdmin">
        <div class="contentChoice">Users</div>
      </router-link>
      <router-link to="/admin/configuration" class="adminChoice" style="background: #1abc9c" v-if="this.$store.getters.isAdmin">
        <div class="contentChoice">Configuration</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { greeting } from '@/utils/utils.js'
import AdminService from '@/services/AdminService'

export default {
  data: () => ({
    greeting: '',
    rank: null
  }),
  created () {
    this.greeting = greeting()
    AdminService.getRankById(this.$store.state.rank).then((response) => {
      this.rank = response['data']['label']
    })
  }
}
</script>


<style lang="scss" scoped>
a {
  text-decoration: none;
}

.title {
  text-align: center;
  font-family: Roboto-Light;
  text-transform: uppercase;
  font-size: 25px;
  color: rgb(40, 40, 40);
  margin: 15px;
  letter-spacing: 1px;
}

.adminChoiceBlock {

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;

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
</style>

