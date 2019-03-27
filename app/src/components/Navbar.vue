<template>
  <div class="sidebar">
    <div class="menu-top">
      <div class="brand">
        DaBoard
      </div>
      <router-link to="/" exact-active-class="active">
        <div class="item">Home</div>
      </router-link>
      <router-link to="/news" exact-active-class="active">
        <div class="item">News</div>
      </router-link>
      <router-link to="/scheduler" exact-active-class="active">
        <div class="item">Scheduler</div>
      </router-link>
    </div>
    <div class="menu-bottom">
      <a href="#">
        <div class="item time">
          {{ time }}
        </div>
      </a>
      <router-link v-if="!this.$store.state.logged && !this.$store.state.rotation" to="/admin" exact-active-class="active">
        <div class="item">Sign in</div>
      </router-link>
      <router-link v-else-if="this.$store.state.logged && !this.$store.state.rotation" to="/admin" exact-active-class="active" active-class="active">
        <div class="item">Admin</div>
      </router-link>
    </div>
    <div class="copyright">
      <div>
        <img src="/images/user.svg" class="icon"> Guillaume Sivade
      </div>
      <div>
        Made with <img src="@/assets/images/heart.svg" class="icon"> in Nice, France <img src="@/assets/images/sun.svg" class="icon">
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Navbar',
  data: () => ({
    time: ''
  }),
  created () {
    this.updateTime()
    setInterval(this.updateTime, 1000)
  },
  methods: {
    updateTime () {
      this.time = moment().format('HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
.active {

  background: #f5f6fa;

}

.sidebar {

  display: flex;
  flex-direction: column;
  vertical-align: top;
  height: 100vh;
  position: fixed;
  width: 200px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  a {

    font-family: "Roboto";
    letter-spacing: 1px;
    font-size: 13px;
    text-decoration: none;
    color: black;

    &:hover {

      transition: 150ms;
      background: #f5f6fa;

    }

    .item {

      display: flex;
      min-height: 50px;
      align-items: center;
      justify-content: center;

    }

    .time {
      font-family: Roboto-Bold;
      font-size: 25px;
    }

  }

  .menu-top {

    display: flex;
    flex-grow: 1;
    flex-direction: column;

    .brand {
      display: flex;
      min-height: 10vh;
      align-items: center;
      justify-content: center;
      font-family: "Roboto-Bold";
      letter-spacing: 1px;
      font-size: 25px;
    }

  }

  .menu-bottom {

    display: flex;
    flex-direction: column-reverse;

  }

  .copyright {

    display: flex;
    padding: 5px;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    font-family: "Roboto-Light";
    font-size: 10px;

    .icon {
      width: 10px;
      margin: 0 2px 0 2px;
    }

  }

}
</style>
