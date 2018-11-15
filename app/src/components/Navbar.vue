<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a class="navbar-brand" href="/">DaBoard</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <router-link class="nav-item" tag="li" to="/" exact-active-class="active">
          <a class="nav-link">Accueil</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/news" exact-active-class="active">
          <a class="nav-link">News</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/news" exact-active-class="active">
          <a class="nav-link">Transports</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/news" exact-active-class="active">
          <a class="nav-link">Planning</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 6vh;
}
</style>
