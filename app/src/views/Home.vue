<template>
  <div class="content">
    <Navbar/>
    <div class="frame">

    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { setTimeout } from 'timers';

export default {
  name: 'home',
  components: {
    Navbar
  },
  mounted () {
    //setTimeout(() => this.$router.push({ path: '/news' }), 5000)
  }
}
</script>

<style lang="scss" scoped>
.content {

  display: flex;
  flex-direction: row;
  height: 100vh;

  .frame {
    
    flex-grow: 1;

  }

}
</style>
