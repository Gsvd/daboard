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
  name: 'news',
  components: {
    Navbar
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
