<template>
  <div>
    <div class="title">{{ this.greeting }},&nbsp;{{ this.$store.state.username }}</div>
    <div class="adminChoiceBlock">
      <router-link to="/admin/news">
        <div class="adminChoice" style="background: #1289A7">
          <div class="contentChoice">News</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { greeting } from '@/utils/utils.js'

export default {
  data: () => ({
    greeting: ''
  }),
  mounted () {
    this.greeting = greeting()
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

