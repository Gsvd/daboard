<template>
  <div class="content">
    <div class="frame">
      <div style="margin-bottom: 10px;">Waiting for SUPINFO API approval...</div>
      <div><img src="https://media.giphy.com/media/26gJAzOW1B7EdvWRG/giphy.gif" alt="SUPINFO"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scheduler',
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .frame {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
  }
}
</style>
