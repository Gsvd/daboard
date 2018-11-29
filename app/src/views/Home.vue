<template>
  <div class="content">
    <Navbar/>
    <div class="frame">

    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbar
  },
  mounted () {
    if (this.$route.path === '/start') {
      this.$store.commit('toggleRotation', true)
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
.content {

  display: flex;
  flex-direction: row;
  height: 100vh;

  .frame {
    
    flex-grow: 1;
    padding: 15px;
    background: rgb(253, 253, 253);
    overflow-y: auto;

    .has-error {

      border-color: red;

    }

    .text-danger {

      color: red;

    }

  }

}
</style>
